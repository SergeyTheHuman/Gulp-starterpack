
# Моя Gulp сборка

---

## Что она умеет:

1. **Копировать файлы из папки /src в папку dist**
2. **Очищать папку /dist перед каждым запуском сборки**
3. **Собирать и конвертировать .pug файлы в готовый .html файл**
4. **Собирать и конвертировать .sass файлы в готовый .css файл**
5. **Собирать и конвертировать .js файлы в готовый .js файл**
6. **Минифицировать все исходные файлы**
7. **Работать с картинками**
   -  **Сжимать их**
   -  **Конветировать в .webp**
   -  **Оборачивать .webp в тег \<picture\> и делать fallback на .jpg**
8. **Создавать один svg-спрайт из всех векторных иконок**
9. **Работать со шрифтами**
   -  **Конвертировать из otf и ttf в woff и woff2**
   -  **Автоматически создавать файл fonts.sass и заполнять его**

```sass
//Пример автоматически созданного файла .sass

@font-face
   font-family: BanderaPro
   font-display: swap
   src: url('../fonts/BanderaPro-Bold.woff2') format('woff2'), url('../fonts/BanderaPro-Bold.woff') format('woff'),
   font-weight: 700
   font-style: normal

@font-face
   font-family: BanderaPro
   font-display: swap
   src: url('../fonts/BanderaPro-Heavy.woff2') format('woff2'), url('../fonts/BanderaPro-Heavy.woff') format('woff'),
   font-weight: 800
   font-style: normal
```

10.   **Изменять пути до файлов, например:**

```pug
//Пример использования .svg

svg.android-icon
   use(xlink:href='@svg/android')

//Пример использования .img

img(src="@img/ready.jpg", alt="#")
```

_И это станет_

```html
<svg class="android-icon">
   <use xlink:href="images/symbol/svg/sprite.symbol.svg#android"></use>
</svg>

<picture>
   <source srcset="images/ready.webp" type="image/webp" />
   <img src="images/ready.jpg" alt="#" />
</picture>
```

11.   **Запускать сервер и автоматически обновлять верстку при изменении файлов**
12.   **Автоматически создавать zip-архив папки /dist для отправки заказчику**
13.   **Автоматически определять, поддерживает ли браузер формат .webp, и добавлять класс 'webp' или 'no-webp' на body**
14.   **Работать в режимах 'development' и 'production'**

---

## Как начать работу

1. **Скачать сборку**
2. **Пишем `npm i` в корне**
3. **Git инициализировать нужно в папке /src, чтобы не мучаться с отслеживанием папок /node_modules, /dist и т.д. Файл .gitignore уже лежит в /src**
4. **Если появляются ошибки, то можно заглянуть в package-backup.json и посмотреть, какие версии пакетов были изначально и точно работали. В крайнем случае - установить их ('webp-converter' должен быть именно версии 2.2.3, его не трогать)**
5. **Готово! Приятного пользования**

---

> Отдельное спасибо Евгению и Владилену с каналов [Фрилансер по жизни](https://www.youtube.com/channel/UCedskVwIKiZJsO8XdJdLKnA) и [Владилен Минин](https://www.youtube.com/c/VladilenMinin) соответственно