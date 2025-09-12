import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { NgSelectComponent } from '@ng-select/ng-select';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AppService } from '../../app.service';
import { CarItemComponent } from '../../blocks/car-item/car-item.component';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  imports: [ReactiveFormsModule, NgSelectComponent, CarItemComponent],
})
export class SearchPage implements OnInit {
  public readonly fb = inject(FormBuilder);

  public readonly appService = inject(AppService);

  public form!: FormGroup;

  public cars: any[] = [];
  public pagination: any = null;
  public currentPage = 1;
  public pageSize = 12;
  public showAdvancedFilters = false; // Для мобильной версии

  public BRANDS_AND_MODELS!: any[];

  ngOnInit() {
    this.form = this.fb.group({
      brand: [null],
      model: [null],
      yearStart: [null],
      yearEnd: [null],
      mileageStart: [null],
      mileageEnd: [null],
      gearbox: [[]],
      fuel: [[]],
      powerValueStart: [null],
      powerValueEnd: [null],
      engineStart: [null],
      engineEnd: [null],
      drive: [[]],
      priceStart: [null],
      priceEnd: [null],
      conditionerType: [[]],
      windowLifter: [[]],
      interiorMaterials: [[]],
      interiorColor: [[]],
      powerSteering: [[]],
      steeringWheelAdjustment: [[]],
      spareWheel: [[]],
      headlights: [[]],
      seatAdjustment: [[]],
      memorySeatModule: [[]],
      seatHeated: [[]],
      seatVentilation: [[]],
    });

    this.appService
      .getBrandsAndModelsWithCount()
      .subscribe(
        (BRANDS_AND_MODELS) => (this.BRANDS_AND_MODELS = BRANDS_AND_MODELS),
      );

    this.form.valueChanges
      .pipe(
        startWith(this.form.value),
        debounceTime(300),
        map((v) => this.cleanup(v)),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        switchMap((dto) => this.appService.searchCars({ ...dto, page: this.currentPage, limit: this.pageSize })),
      )
      .subscribe((response) => {
        this.cars = response.cars || [];
        this.pagination = response.pagination || null;
      });
  }

  private cleanup(v: any) {
    const out: any = { ...v };
    Object.keys(out).forEach((k) => {
      const val = out[k];
      if (val === '' || val == null) delete out[k];
      if (Array.isArray(val) && val.length === 0) delete out[k];
    });
    return out;
  }

  get brands() {
    return this.BRANDS_AND_MODELS;
  }

  get models() {
    const brand = this.form.get('brand')?.value;

    if (brand) {
      return this.BRANDS_AND_MODELS.find((item) => item.title === brand).models;
    }

    return [];
  }

  public readonly gearboxes = [
    'Механика',
    'Автомат',
    'Типтроник',
    'Робот',
    'Вариатор',
  ];

  public readonly fuels = [
    'Бензин',
    'Газ',
    'Газ пропан-бутан / Бензин',
    'Газ метан / Бензин',
    'Гибрид',
    'Гибрид (HEV)',
    'Гибрид (PHEV)',
    'Гибрид (MHEV)',
    'Дизель',
    'Электро',
  ];

  public readonly drives = ['Полный', 'Передний', 'Задний'];

  public readonly options = [
    {
      title: 'Кондиционер',
      controlName: 'conditionerType',
      values: [
        'Кондиционер',
        'Климат-контроль 1-зонный',
        'Климат-контроль 2-зонный',
        'Климат-контроль многозонный',
      ],
    },
    {
      title: 'Электростеклоподъёмники',
      controlName: 'windowLifter',
      values: ['Передние', 'Передние и задние'],
    },
    {
      title: 'Материалы салона',
      controlName: 'interiorMaterials',
      values: [
        'Ткань',
        'Кожа',
        'Велюр',
        'Комбинированный',
        'Искусственная кожа',
        'Алькантара',
      ],
    },
    {
      title: 'Цвет салона',
      controlName: 'interiorColor',
      values: ['Светлый', 'Тёмный', 'Коричневый'],
    },
    {
      title: 'Усилитель руля',
      controlName: 'powerSteering',
      values: ['Гидро', 'Электро'],
    },
    {
      title: 'Регулировка руля',
      controlName: 'steeringWheelAdjustment',
      values: ['По высоте', 'По высоте и по вылету'],
    },
    {
      title: 'Запасное колесо',
      controlName: 'spareWheel',
      values: ['Полноразмерное', 'Докатка'],
    },
    {
      title: 'Фары',
      controlName: 'headlights',
      values: [
        'Ксенон/Биксенон',
        'Лазерные',
        'Светодиодные',
        'Матричные',
        'Галогенные',
      ],
    },
    {
      title: 'Регулировка сидений по высоте',
      controlName: 'seatAdjustment',
      values: [
        'Ручная регулировка сиденья водителя',
        'Ручная регулировка передних сидений',
        'Электрорегулировка сиденья водителя',
        'Электрорегулировка передних сидений',
        'Электрорегулировка передних и задних сидений',
      ],
    },
    {
      title: 'Память положения сидений',
      controlName: 'memorySeatModule',
      values: [
        'Сиденье водителя',
        'Передние сиденья',
        'Передние и задние сиденья',
      ],
    },
    {
      title: 'Подогрев сидений',
      controlName: 'seatHeated',
      values: ['Передние сиденья', 'Передние и задние сиденья'],
    },
    {
      title: 'Вентиляция сидений',
      controlName: 'seatVentilation',
      values: ['Передние сиденья', 'Передние и задние сиденья'],
    },
  ];

  public readonly group1 = [
    'Бортовой компьютер',
    'Подогрев зеркал',
    'Круиз-контроль',
    'Электропривод зеркал',
    'Тонированные стекла',
    'Датчик дождя',
    'Многофункциональный руль',
    'Передний центральный подлокотник',
    'Розетка 12V',
    'Отделка руля кожей',
    'Прикуриватель и пепельница',
    'Складное заднее сиденье',
    'Электроскладывание зеркал',
    'Отделка кожей рычага КПП',
    'Бардачок с охлаждением',
    'Запуск двигателя с кнопки',
    'Адаптивный круиз',
    'Декоративная подсветка салона',
    'Третий задний подголовник',
    'Обогрев лобового стекла',
    'Система «старт-стоп»',
    'Выбор режима движения',
    'Система доступа без ключа',
    'Люк',
    'Электронная приборная панель',
    'Электропривод крышки багажника',
    'Обогрев руля',
    'Электрорегулировка руля',
    'Подрулевые лепестки переключения передач',
    'Панорамная крыша / Лобовое стекло',
    'Открытие багажника без помощи рук',
    'Декоративные накладки на педали',
    'Функция складывания спинки сиденья пассажира',
    'Руль с памятью положения',
    'Отделка потолка черного цвета',
    'Третий ряд сидений',
    'Беспроводная зарядка для смартфона',
    'Дистанционный запуск двигателя',
    'Солнцезащитные шторки в задних дверях',
    'Розетка 220V',
    'Солнцезащитная шторка на заднем стекле',
    'Проекционный дисплей',
    'Складной столик на спинках передних сидений',
    'Доводчик дверей',
    'Холодильник',
    'Сиденья с массажем',
    'Регулируемый педальный узел',
  ];

  public readonly group2 = [
    'Парктроник задний',
    'Задняя камера',
    'Парктроник передний',
    'Передняя камера',
    'Камера 360',
    'Система автоматической парковки',
  ];

  public readonly group3 = [
    'AUX',
    'USB',
    'Bluetooth',
    'Акустика',
    'Навигационная система',
    'Мультимедиа система с LCD-экраном',
    'Голосовое управление',
    'Аудиоподготовка',
    'Android Auto',
    'CarPlay',
    'Система мультимедиа для задних пассажиров',
  ];

  public readonly group4 = [
    'Противотуманные фары',
    'Датчик света',
    'Дневные ходовые огни',
    'Омыватель фар',
    'Система адаптивного освещения',
    'Система управления дальним светом',
  ];

  public readonly group5 = [
    'Антиблокировочная система (ABS)',
    'Центральный замок',
    'Блокировка замков задних дверей',
    'Антипробуксовочная система (ASR)',
    'Система стабилизации (ESP)',
    'Иммобилайзер',
    'Сигнализация',
    'Датчик давления в шинах',
    'Система крепления IsoFix',
    'Распределение тормозных усилий (BAS, EBD)',
    'Помощь при старте в гору',
    'Помощь при спуске',
    'Стабилизация рулевого управления (VSM)',
    'Датчик проникновения в салон (датчик объёма)',
    'Предотвращение столкновения',
    'Контроль слепых зон',
    'Датчик усталости водителя',
    'Контроль за полосой движения',
    'Распознавание дорожных знаков',
    'Ночное видение',
  ];

  public readonly group6 = [
    'Гаражное хранение',
    'Сервисная книжка',
    'Первый владелец',
    'Первая регистрация',
    'Авто в кредите',
  ];

  public readonly group7 = [
    'Защита картера',
    'Фаркоп',
    'Защита коробки',
    'Накладки на пороги',
    'Длинная база',
    'Кузов MAXI',
    'Бронированный кузов',
  ];

  public readonly group8 = [
    'Водителя',
    'Пассажира',
    'Боковые передние',
    'Боковые задние',
    'Оконные (шторки)',
    'Подушка для колен водителя',
  ];

  public readonly group9 = [
    'Газобаллонное оборудование (ГБО)',
    'Автономный обогреватель Webasto',
    'Пневмоподвеска',
    'Ручное управление для людей с инвалидностью',
    'Пандус для людей с инвалидностью',
  ];

  clearControl(controlName: string) {
    this.form.get(controlName)?.reset();
  }

  // Методы пагинации
  goToPage(page: number) {
    if (page >= 1 && page <= (this.pagination?.totalPages || 1)) {
      this.currentPage = page;
      this.searchCars();
    }
  }

  nextPage() {
    if (this.pagination?.hasNext) {
      this.goToPage(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.pagination?.hasPrev) {
      this.goToPage(this.currentPage - 1);
    }
  }

  private searchCars() {
    const dto = this.cleanup(this.form.value);
    this.appService.searchCars({ ...dto, page: this.currentPage, limit: this.pageSize })
      .subscribe((response) => {
        this.cars = response.cars || [];
        this.pagination = response.pagination || null;
      });
  }

  // Генерация массива страниц для отображения
  get pageNumbers(): number[] {
    if (!this.pagination) return [];
    
    const current = this.pagination.page;
    const total = this.pagination.totalPages;
    const pages: number[] = [];
    
    // Показываем максимум 5 страниц
    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  toggleAdvancedFilters() {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  // Метод для поиска автомобилей
  search() {
    this.currentPage = 1;
    this.searchCars();
  }

  // Метод для очистки всех фильтров
  clearAllFilters() {
    this.form.reset();
    this.currentPage = 1;
    this.searchCars();
  }
}
