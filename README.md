# PROYECTO MÓDULO 6: Alke Wallet - Aplicación Web con Django

Aplicación web desarrollada con el framework Django (Python) para la gestión de finanzas personales, integrando un sistema robusto de autenticación, seguridad de rutas y una interfaz de usuario dinámica y responsiva.

## Sobre el proyecto
Este proyecto marca la evolución de una interfaz estática hacia una aplicación web dinámica (Full Stack). Alke Wallet simula el entorno de una billetera digital donde los usuarios pueden administrar sus fondos, realizar depósitos y transferencias. El enfoque principal de esta fase del desarrollo es la implementación del patrón de arquitectura MVT (Model-View-Template) de Django, garantizando la seguridad de las rutas, el control de acceso de los usuarios y la reutilización eficiente de código en el frontend.

## Funciones Principales
El sistema de Alke Wallet ofrece las siguientes capacidades operativas:

* **Sistema de Autenticación:** Inicio y cierre de sesión seguros utilizando las vistas genéricas de Django (`LoginView`, `LogoutView`) con protección contra ataques CSRF.
* **Autorización y Seguridad:** Protección de rutas sensibles mediante el decorador `@login_required`, asegurando que solo usuarios autenticados accedan a su bóveda financiera.
* **Control de Acceso por Roles (RBAC):** Gestión centralizada de usuarios a través del panel de administración de Django, utilizando "Grupos" (ej. Clientes) para escalar los permisos de forma eficiente.
* **Interfaz Dinámica (DRY):** Uso avanzado del motor de plantillas de Django (`{% extends %}`, `{% include %}`, `{% block %}`) para crear una estructura HTML modular, heredando una plantilla base y evitando la duplicación de código.
* **Manejo de Errores Personalizado:** Pantallas de error amigables y diseñadas a medida para mejorar la experiencia del usuario (Error 404 para páginas no encontradas y Error 403 para accesos denegados).

## Instalación y Uso
Para ejecutar la aplicación en un entorno local, siga estos pasos:

1. Clonar el repositorio en su máquina local:
   `git clone https://github.com/JoaquinaPino/alke-wallet-django.git`
2. Asegurarse de tener Python 3.x instalado.
3. Entrar a la carpeta raíz del proyecto:
   `cd alke-wallet-django`
4. Crear y activar un entorno virtual:
   * Windows: `python -m venv venv` seguido de `venv\Scripts\activate`
   * Mac/Linux: `python3 -m venv venv` seguido de `source venv/bin/activate`
5. Instalar las dependencias (Django):
   `pip install django`
6. Iniciar el servidor de desarrollo:
   `python manage.py runserver`
7. Abrir el navegador e ingresar a: `http://127.0.0.1:8000/`

## Estructura del Código
El proyecto sigue el patrón MVT de Django para separar responsabilidades y facilitar el mantenimiento:

* **manage.py:** Orquestador principal del proyecto y comandos de consola.
* **alke_wallet/**: Carpeta de configuración global.
    * `settings.py`: Configuraciones de seguridad, aplicaciones instaladas, rutas estáticas y variables de entorno (`DEBUG`, `LOGIN_URL`).
    * `urls.py`: Enrutador principal que conecta las URLs con la aplicación web.
* **web/**: Aplicación principal de la billetera.
    * `views.py`: Contiene la lógica de los controladores, renderizado de plantillas y barreras de seguridad.
    * `urls.py`: Enrutador específico de la aplicación.
* **templates/**: Directorio de la capa de presentación (Frontend).
    * `web/base.html`: Esqueleto maestro con Bootstrap que hereda su estructura al resto del sitio.
    * `403.html` / `404.html`: Páginas de manejo de excepciones.
* **static/**: Archivos estáticos centralizados (`css/`, `js/`, `img/`).

## Desafíos Técnicos
Durante el desarrollo se abordaron y resolvieron los siguientes retos:
* **Refactorización de Frontend a Backend:** Migración de múltiples archivos HTML estáticos hacia un sistema de herencia de plantillas en Django sin romper el diseño responsivo de Bootstrap.
* **Seguridad en Formularios:** Adaptación de botones de "Cerrar sesión" desde simples enlaces GET hacia peticiones POST seguras con tokens `{% csrf_token %}` para evitar vulnerabilidades.
* **Gestión de Sesiones y Caché:** Resolución de conflictos visuales en el DOM causados por la persistencia de cookies y la lectura asíncrona de archivos JavaScript sobre las variables nativas de Django (`{{ request.user }}`).

## Demostración
Puede ver una demostración funcional de la navegación, seguridad y uso del panel de administración en el siguiente enlace:
[Link directo a YouTube](Proximamente...)

---
**Autor:** Joaquina Pino
**Curso:** Python Full Stack - Módulo 6