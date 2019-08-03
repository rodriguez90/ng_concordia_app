
// TODO: aqui podriamos definir un opjeto parecido al del endpoint donde
// se se tenga un nombre de la ruta, y valor de la ruta
// y que en el ruteo de los modulos se usen estas rutas
const appRoutes = [
    {
        name: 'Administación',
        url: 'admin',
    },
    // {
    //   name: 'Administración de Usuarios',
    //   url: 'admin/usuario',
    // },
    {
        name: 'Administración de Roles',
        url: 'admin/rol',
    },
    {
        name: 'Administración de Menú',
        url: 'admin/menu',
    },
    {
        name: 'Administración de Oficinas',
        url: 'admin/oficina',
    },
    {
        name: 'Administración de Supervisores',
        url: 'admin/supervisores',
    },
    {
        name: 'Administración de Mantenimientos',
        url: 'admin/mantenimientos',
    },
    {
        name: 'Administración de Dispositivos',
        url: 'admin/dispositivos',
    },
    {
        name: 'Consola',
        url: 'consola',
    },
    {
        name: 'Corresponsales',
        url: 'corresponsales',
    },
    {
        name: 'Logs',
        url: 'logs',
    },
    {
        name: 'Alertas',
        url: 'alertas',
    }

];

export default appRoutes;
