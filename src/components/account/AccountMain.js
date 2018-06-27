import React, { Component } from 'react';

class AccountMain extends Component {
    render() {
        return(
            <section className="account__section">
                <h1>Acciones que puedes realizar</h1>
                <ul>
                    <li className="account__item"><i className="material-icons">play_arrow</i> VENDE O RENTA TU PROPIEDAD: Comienza el proceso para poner en venta o renta tu propiedad, ingresa a este link, completa el formulario y un corredor inmobiliario de WE MANAGE de tu zona se pondrá en contacto contigo para completar el proceso y comenzar a promoveer tu propiedad.</li>
                    <li className="account__item"><i className="material-icons">play_arrow</i> VER INFORMACIÓN DE LOS CONDOMINIOS QUE HABITAS: Ingresa a este link con el la barra de navegación da click en CONDOMINIO(S) y verás los condominios en donde cuentas con alguna propiedad o sear arrendatario; aquí podrás ver toda la información relacionada a tu condominio, fichas de pago y agregar visitas.</li>
                    <li className="account__item"><i className="material-icons">play_arrow</i> HACER LICITACIONES: ¿Necesitas algún trabajo de mantenimiento o instalación y buscas revisar distintas opciones con precios, materiales, tiempos de ejecución y otros factores? Nosotros te ayudamos, crea una licitación; detalla los servicios que requieras y nosotros nos encargaremos de distribuir los detalles con proveedores especializados para que presenten una cotización con el respaldo, seguridad y garantía de completa satisfacción de nuestra empresa.</li>
                    <li className="account__item"><i className="material-icons">play_arrow</i> PROMOCIONES: Encuentra todas las promociones exclusivas para clientes WE MANAGE, nuestros patrocinadores te brindarán los mejores descuentos y cortesías sólo por pertenecer a nuestra plataforma.</li>
                </ul>
            </section>
        )
    }
}

export default AccountMain;