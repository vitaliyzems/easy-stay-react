Области хранения данных:

База данных на json-server (БД)
BFF
Redux store

Сущности приложения:

Пользователь: БД (список пользователей), BFF (сессия текущего пользователя), Store (отображение в браузере)
Роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью), Store (использование на клиенте)
Статья: БД (список стетей), Store (отображение в браузере)
Комментарий: БД (список комментариев), Store (отображение в браузере)

Таблицы БД:

Пользователи - users: id / login / password / registered_at / role_id
Роли - roles : id / name
Отели - hotels: id / name / address / image_url
Номера - rooms: id / hotel_id / type / price / availability / image_url
Комментарии - comments: id / author_id / hotel_id / content

Схема состояния на BFF:

Сессия текущего пользователя: login / password / role

Схема для Redux store (на клиенте):

user: id / login / roleId / session
hotels: массив hotel: id / name / imageUrl / address
hotel: id / name / imageUrl / address / comments: массив comment: id / author / content / publishedAt

<!-- users массив user: id / login / registeredAt / role -->
