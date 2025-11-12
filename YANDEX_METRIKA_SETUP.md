# Настройка Яндекс.Метрики для Auto Broker

## КРИТИЧНО для SEO Яндекса!

Без Яндекс.Метрики сайт НЕ попадет в:
- Яндекс.Справочник
- Яндекс.Карты
- Расширенные сниппеты
- Приоритетную индексацию

## Шаги установки:

### 1. Создайте счетчик в Яндекс.Метрике
1. Зайдите на https://metrika.yandex.ru
2. Нажмите "Добавить счетчик"
3. Введите адрес сайта: `https://vamauto.com`
4. Скопируйте код счетчика

### 2. Установите код в index.html

Добавьте перед закрывающим тегом `</head>` в файле `src/index.html`:

```html
<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(XXXXXXXX, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true,
        ecommerce:"dataLayer"
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/XXXXXXXX" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
```

**ЗАМЕНИТЕ XXXXXXXX на ваш ID счетчика!**

### 3. Включите E-commerce для отслеживания продаж

Метрика уже настроена с `ecommerce:"dataLayer"`.

Добавьте отслеживание целей:
- Просмотр карточки автомобиля
- Клик на "Связаться"
- Отправка формы

### 4. Проверьте установку

1. Откройте сайт
2. Зайдите в Яндекс.Метрику
3. Проверьте раздел "Онлайн" - должны появиться посетители

### 5. Настройте цели

В Яндекс.Метрике создайте цели:
1. **Просмотр каталога** - посещение `/cars/search`
2. **Просмотр машины** - посещение `/cars/*`
3. **Клик на Telegram** - клик по кнопке с Telegram
4. **Отправка формы** - клик по `#form-submit-btn`

## Дополнительные настройки

### Верификация в Яндекс.Вебмастере

1. Зайдите на https://webmaster.yandex.ru
2. Добавьте сайт `https://vamauto.com`
3. Скопируйте код верификации
4. Добавьте в `src/app/config/seo.config.ts`:

```typescript
home: {
  // ... другие поля
  yandexVerification: 'ВАШ_КОД_ВЕРИФИКАЦИИ'
}
```

### Подключение к Яндекс.Справочнику

После установки метрики:
1. Зайдите на https://sprav.yandex.ru
2. Добавьте организацию "Auto Broker"
3. Укажите адрес, телефон, график работы
4. Загрузите фотографии офиса и автомобилей
5. Подтвердите владение через Метрику

## Важно!

После установки Метрики подождите 2-3 дня, чтобы Яндекс начал получать данные и улучшил индексацию сайта.

