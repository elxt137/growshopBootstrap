const notificarBtn = document.querySelector('#notificar');

notificarBtn.addEventListener('click' , () => {
    Notification
        .requestPermission()
        .then(resultado => {
            console.log('El resultado es ' , resultado)
        })
});

    //imprimo una notificacion

const verNotificacion = document.querySelector('#verNotificacion');
verNotificacion.addEventListener('click' , () => {
    if(Notification.permission ==='granted') {
        const notificacion = new Notification('Esta es la notificacion', {
            icon: '/img/WhatsApp Image 2022-08-03 at 7.18.06 PM.jpeg'
        }
        );

        notificacion.onclick = function() {
                window.open('./pages/ubicacion.html')
        }
    }
}
);