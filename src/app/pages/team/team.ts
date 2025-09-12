import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ContactUsComponent} from '../../blocks/contact-us/contact-us.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './team.html',
  styleUrl: './team.scss'
})
export class Team implements AfterViewInit {
  teamMembers = [
    {
      name: 'Александр Петров',
      position: 'Основатель компании',
      experience: '12 лет опыта',
      bio: 'Специалист по китайскому авторынку. Лично импортировал более 500 автомобилей. Знает все тонкости работы с китайскими производителями.',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6PQB6NXeUz0U6M4Km9g5JCmNSdyNUxOj31w&s',
      skills: ['Китайский авторынок', 'Переговоры', 'Стратегическое планирование']
    },
    {
      name: 'Дмитрий Иванов',
      position: 'Главный логист',
      experience: '8 лет опыта',
      bio: 'Организует доставку авто из любой точки мира. Знает все тонкости таможенного оформления и оптимизации логистических процессов.',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYDRXOP7BX3DIoN1vHJK4QxoRRkjrzRhPtMA&s',
      skills: ['Международная логистика', 'Таможенное оформление', 'Документация']
    },
    {
      name: 'Екатерина Смирнова',
      position: 'Менеджер по клиентам',
      experience: '6 лет опыта',
      bio: 'Поможет подобрать авто по вашим параметрам и ответит на все вопросы. Сопровождает клиента на всех этапах сделки.',
      photo: 'https://aif-s3.aif.ru/images/019/507/eeba36a2a2d37754bab8b462f4262d97.jpg',
      skills: ['Работа с клиентами', 'Консультации', 'Подбор авто']
    },
    {
      name: 'Михаил Волков',
      position: 'Технический специалист',
      experience: '10 лет опыта',
      bio: 'Проводит диагностику и технический осмотр автомобилей перед отправкой клиенту. Гарантирует качество и надежность каждого авто.',
      photo: 'https://www.b17.ru/foto/users/user_803627_900.jpg',
      skills: ['Диагностика авто', 'Технический осмотр', 'Сервисное обслуживание']
    }
  ];

  constructor(private modalService: BsModalService) {}

  openContactUsModal() {
    this.modalService.show(ContactUsComponent);
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.team-member').forEach(el => {
      observer.observe(el);
    });
  }
}
