-   🤝 Academlo Bank 🤝
-   Este es un Proyecto del curso de Backend con NodeJS, utilizando las siguientes librerias:
-   express,
-   express-validator
-   sequalize,
-   cors,
-   dotenv,
-   morgan,
-   pg,
-   pg-hstore.

**_ RUTAS _**

USER
{
_POST_ "SignUp": api/v1/users/signup
_GET_ "Get All Users": api/v1/users
_GET_ "SignIn": api/v1/users/signin
}

TRANSFER:
{
_GET_ "Get All Transfers": api/v1/transfers/:account
_POST_ "User Transfers": api/v1/transfers
}
