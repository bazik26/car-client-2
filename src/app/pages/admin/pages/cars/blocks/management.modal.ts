import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { switchMap } from 'rxjs';

import { AppService } from '../../../../../app.service';

@Component({
  selector: 'app-admin-cars-car-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AccordionModule, NgSelectModule],
  templateUrl: './management.modal.html',
  styleUrls: ['./management.modal.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminCarsManagementModal implements OnInit {
  public readonly fb = inject(FormBuilder);

  public readonly activeModal = inject(BsModalRef);

  public readonly appService = inject(AppService);

  @Input()
  car!: any;

  public form!: FormGroup;

  public BRANDS_AND_MODELS!: any[];

  public previews: (string | null)[] = [];

  result?: { reload: boolean };

  ngOnInit() {
    this.form = this.fb.group({
      brand: [null, [Validators.required]],
      model: [null, [Validators.required]],
      year: [null, [Validators.required]],
      mileage: [null, [Validators.required]],
      vin: [null],
      gearbox: [null, [Validators.required]],
      fuel: [null, [Validators.required]],
      powerValue: [null, [Validators.required]],
      powerType: [null, [Validators.required]],
      engine: [null, [Validators.required]],
      drive: [null, [Validators.required]],
      price: [null, [Validators.required]],

      conditionerType: [null],
      windowLifter: [null],
      interiorMaterials: [null],
      interiorColor: [null],
      powerSteering: [null],
      steeringWheelAdjustment: [null],
      spareWheel: [null],
      headlights: [null],
      seatAdjustment: [null],
      memorySeatModule: [null],
      seatHeated: [null],
      seatVentilation: [null],

      group1: this.fb.array([]),
      group2: this.fb.array([]),
      group3: this.fb.array([]),
      group4: this.fb.array([]),
      group5: this.fb.array([]),
      group6: this.fb.array([]),
      group7: this.fb.array([]),
      group8: this.fb.array([]),
      group9: this.fb.array([]),

      files: this.fb.array([]),
    });

    Object.keys(this.form.controls).forEach((key) => {
      if (
        this.form.get(key) instanceof FormArray &&
        this.car &&
        Array.isArray(this.car[key])
      ) {
        const formArray = this.form.get(key) as FormArray;
        formArray.clear();
        this.car[key].forEach((value: any) => {
          formArray.push(this.fb.control(value));
        });
      }
    });

    if (this.car) {
      this.car.files.forEach((file: any) => {
        this.previews.push(this.appService.getFileUrl(file));
      });

      this.form.patchValue(this.car);
    }

    this.previews.push(null);
    this.files.push(this.fb.control(null));

    this.appService
      .getAllBrandsAndModels()
      .subscribe(
        (BRANDS_AND_MODELS) => (this.BRANDS_AND_MODELS = BRANDS_AND_MODELS),
      );
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

  private _years!: string[];
  get years() {
    if (!this._years) {
      const arr: string[] = [];

      let i = 0;

      while (arr[0] !== '2025') {
        arr.unshift(String(1900 + i));
        i++;
      }

      this._years = arr;
    }

    return this._years;
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

  public readonly powerTypes = ['Л/C', 'кВт'];

  public readonly drives = ['Полный', 'Передний', 'Задний'];

  onCheckboxChange(event: any, groupName: string) {
    const formArray = this.form.get(groupName) as FormArray;
    if (event.target.checked) {
      formArray.push(this.fb.control(event.target.value));
    } else {
      const index = formArray.controls.findIndex(
        (x) => x.value === event.target.value,
      );

      if (index !== -1) {
        formArray.removeAt(index);
      }
    }
  }

  get files(): FormArray {
    return this.form.get('files') as FormArray;
  }

  private ensureTailSlot() {
    for (let i = 0; i < this.files.length - 1; i++) {
      if (!this.files.at(i).value) {
        this.files.removeAt(i);
        this.previews.splice(i, 1);
        i--;
      }
    }
    const needTail =
      this.files.length === 0 || !!this.files.at(this.files.length - 1).value;
    if (needTail) {
      this.files.push(this.fb.control(null));
      this.previews.push(null);
    }
  }

  onFileSelected(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      input.value = '';
      return;
    }

    this.files.at(index).setValue(file);

    if (this.previews[index]) URL.revokeObjectURL(this.previews[index]!);
    this.previews[index] = URL.createObjectURL(file);

    input.value = '';

    this.ensureTailSlot();
  }

  removeFile(index: number, preview: any) {
    if (preview.id) {
      if (confirm(`Удалить изображение из базы?`)) {
        this.appService.deleteCarImage(this.car.id, preview.id).subscribe();
      } else {
        return;
      }
    }

    if (this.previews[index]) URL.revokeObjectURL(this.previews[index]!);
    this.previews.splice(index, 1);
    this.files.removeAt(index);

    this.ensureTailSlot();
  }

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

  onSubmit() {
    if (this.car) {
      this.appService
        .updateCar(this.car.id, this.form.value)
        .pipe(
          switchMap((car: any) =>
            this.appService.uploadCarImages(
              car.id,
              this.form.get('files')!.value,
            ),
          ),
        )
        .subscribe(() => {
          this.result = { reload: true };
          this.activeModal.hide();
        });
    } else {
      this.appService
        .createCar(this.form.value)
        .pipe(
          switchMap((car: any) =>
            this.appService.uploadCarImages(
              car.id,
              this.form.get('files')!.value,
            ),
          ),
        )
        .subscribe(() => {
          this.result = { reload: true };
          this.activeModal.hide();
        });
    }
  }
}
