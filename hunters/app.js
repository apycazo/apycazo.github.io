
var core = angular.module('hunters',[]);

function MasterCtrl ($scope, $sce)
{
    angular.extend($scope, {
        videoSource: function (source) {
            return $sce.trustAsResourceUrl(source);
        },
        selectEntry: function (data) {
            $scope.entry = data;
        },
        closeModal: function () {
            console.log('click');
            $('.modal').modal('hide');
        },
        goBack = function () {
            $('.modal').modal('hide');
        },
        entry: {}
    });

    // $('.modal img').on('click', function () { $('.modal').modal('hide') });

    $scope.portfolio = [
        {
            roc: {
                title: 'Roc',
                desc: 'Publicidad',
                video: '',
                thumbnail: 'portfolio/roc/roc-1.png',
                gallery: [
                    'portfolio/roc/roc-1.png',
                    'portfolio/roc/roc-2.png'
                ]
            },
            lenceria: {
                title: 'Lenceria',
                desc: 'Publicidad',
                video: '',
                thumbnail: 'portfolio/lenceria/lenceria-1.png',
                gallery: [
                    'portfolio/lenceria/lenceria-1.png',
                    'portfolio/lenceria/lenceria-2.png'
                ]
            },
            trainer: {
                title: "Personal Trainer",
                desc: 'Formato de televisión para desarrollo de contenido de marca.',
                video: '',
                thumbnail: 'portfolio/trainer/trainer-1.png',
                gallery: [
                    'portfolio/trainer/trainer-1.png',
                    'portfolio/trainer/trainer-2.png',
                    'portfolio/trainer/trainer-3.png',
                    'portfolio/trainer/trainer-4.png',
                    'portfolio/trainer/trainer-5.png',
                    'portfolio/trainer/trainer-6.png',
                    'portfolio/trainer/trainer-7.png'
                ]
            }
        }, {
            loreal: {
                title: "L'Oreal",
                desc: 'Desarrollo de comunicación interna para L´Oreal.',
                video: '',
                thumbnail: 'portfolio/loreal/loreal-2.jpg',
                gallery: [
                    'portfolio/loreal/loreal-1.jpg',
                    'portfolio/loreal/loreal-2.jpg',
                    'portfolio/loreal/loreal-3.jpg'
                ]
            },
            scenic: {
                title: "Scenic",
                desc: 'Desarrollo de comunicación interna y comercial para el lanzamiento de Renault Scenic.',
                video: 'https://www.youtube.com/embed/HHg9aKY0ti8',
                thumbnail: 'portfolio/scenic/scenic-1.jpg',
                gallery: [
                    'portfolio/scenic/scenic-1.jpg',
                    'portfolio/scenic/scenic-2.jpg'
                ]
            },
            online: {
                title: "Online",
                desc: 'Desarrollo de formato de serie de televisión para branded content.',
                video: '',
                thumbnail: 'portfolio/online/online-1.png',
                gallery: [
                    'portfolio/online/online-1.png',
                    'portfolio/online/online-2.png',
                    'portfolio/online/online-3.png',
                    'portfolio/online/online-4.png',
                    'portfolio/online/online-5.png',
                    'portfolio/online/online-6.png'
                ]
            }
        }, {
            calpe: {
                title: 'Balcones de Calpe',
                desc: 'Desarrollo de imagen y lanzamiento de producto para proyecto arquitectónico de viviendas de lujo en Calpe, Alicante.',
                video: '',
                thumbnail: 'portfolio/calpe/calpe-1.jpg',
                gallery: [
                    'portfolio/calpe/calpe-1.jpg',
                    'portfolio/calpe/calpe-2.jpg',
                    'portfolio/calpe/calpe-3.jpg',
                    'portfolio/calpe/calpe-4.jpg'
                ]
            },
            intertv: {
                title: "InterTV",
                desc: 'Elaboración de varias piezas promocionales para televisión con motivo del lanzamiento de producto de un canal de televisión.',
                video: '',
                thumbnail: 'portfolio/intertv/intertv-1.jpg',
                gallery: [
                    'portfolio/intertv/intertv-1.jpg',
                    'portfolio/intertv/intertv-2.jpg',
                    'portfolio/intertv/intertv-3.jpg',
                    'portfolio/intertv/intertv-4.jpg',
                    'portfolio/intertv/intertv-5.jpg',
                    'portfolio/intertv/intertv-6.jpg'
                ]
            },
            marela: {
                title: "Mira la Marela",
                desc: 'Video publicitario para la marca de bolsos y complementos taurinos Mira la Marela. El video fue rodado en una jornada en la fábrica de bolsos de la marca y en el Hotel  Wellington, donde se conto con la colaboración del maestro  David Mora.',
                video: 'https://www.youtube.com/embed/5qrtxiAD_qw',
                thumbnail: 'portfolio/marela/marela-1.png',
                gallery: [
                    'portfolio/marela/marela-1.png',
                    'portfolio/marela/marela-2.png'
                ]
            }
        }, {
            saludMadrid: {
                title: "Salud Madrid",
                desc: 'Video publicitario para la consejería de sanidad de Madrid. La pieza fue rodada en primavera en la sierra de Madrid, en un entorno de naturaleza que transmitia muy bien el concepto de salud. Se conto con un equipo pequeño y ligero, ya que los trayectos de una localización a otra eran largos y el único medio para llegar a ellos era andando.',
                video: 'https://www.youtube.com/embed/_xOEJumRZ2Y',
                thumbnail: 'portfolio/salud-madrid/salud-1.jpg',
                gallery: [
                    'portfolio/salud-madrid/salud-1.jpg',
                    'portfolio/salud-madrid/salud-2.jpg',
                    'portfolio/salud-madrid/salud-3.jpg'
                ]
            },
            unidad16: {
                title: "Unidad 16",
                desc: 'Video de promoción de la unidad de cuerpo de bomberos de Sevilla. El video fue rodado en un edificio donde el cuerpo de bomberos suelen hacer simulacros de incendios. Se rodo practicamente a tiempo real, sin dar casi opción a repetir tomas, ya que la temperatura provocada por las llamas ascendía en algunos momentos a los 700ºc.',
                video: 'https://www.youtube.com/embed/Z_ovNGD-t6Q',
                thumbnail: 'portfolio/unidad16/unidad-16-1.png',
                gallery: [
                    'portfolio/unidad16/unidad-16-1.png',
                    'portfolio/unidad16/unidad-16-2.png',
                    'portfolio/unidad16/unidad-16-3.png',
                ]
            },
            pasajeros: {
                title: "Pasajeros",
                desc: 'Video realizado para instituto de la mujer. El video fue grabado  a modo de guerrilla en un viaje en Ave Madrid -Barcelona. La sensación de melancolía fue retrada de forma elegante y cuidada.',
                video: 'https://www.youtube.com/embed/gm0cOs_UtUY',
                thumbnail: 'portfolio/pasajeros/pasajeros-1.png',
                gallery: [
                    'portfolio/pasajeros/pasajeros-1.png',
                    'portfolio/pasajeros/pasajeros-2.png'
                ]
            }
        }, {
            movistarCuello: {
                title: "Movistar Cuello",
                desc: 'Video viral para Movistar con gran impacto en las redes sociales. En clave de comedia se cuenta las enfermedades que surgen por la utilización desproporcionada del teléfono móvil. Rodaje muy divertido donde la actriz protagonista lo borda con ese puntito de excentricidad.',
                video: 'https://www.youtube.com/embed/067vWVzAUCo',
                thumbnail: 'portfolio/movistar-cuello/movistar-cuello-1.png',
                gallery: []
            },
            activyl: {
                title: "Activyl",
                desc: 'Campaña de lanzamiento de producto en europa para presentaciones y eventos comerciales.',
                video: 'https://www.youtube.com/embed/mbyQKpwYxZo',
                thumbnail: 'portfolio/activyl/activyl-1.jpg',
                gallery: [
                    'portfolio/activyl/activyl-1.jpg',
                    'portfolio/activyl/activyl-2.jpg',
                    'portfolio/activyl/activyl-3.jpg',
                    'portfolio/activyl/activyl-4.jpg',
                ]
            },
            qudum: {
                title: "Qudum",
                desc: 'Video publicitario para la nueva red social Qudum. La pieza fue rodada en plató con una decoración retro y un sentido del humor muy fresco. La anécdota de este rodaje fue la interpretación del personaje del abuelo, ya que era la primera vez que se ponía delante de una cámara. Nos dejó fascinados su espontaneidad y su frescura.',
                video: 'https://www.youtube.com/embed/s4zLgtEcn_4',
                thumbnail: 'portfolio/qudum/qudum-1.png',
                gallery: []
            }
        }, {
            guadalajara2011: {
                title: "Guadalajara 2011",
                desc: 'Cabecera oficial de los juegos preolimpicos de Guadalajara 2011.',
                video: 'https://www.youtube.com/embed/MP6_DW9HgAw',
                thumbnail: 'portfolio/guadalajara2011/guadalajara2011-1.jpg',
                gallery: [
                    'portfolio/guadalajara2011/guadalajara2011-1.jpg',
                    'portfolio/guadalajara2011/guadalajara2011-2.jpg',
                    'portfolio/guadalajara2011/guadalajara2011-3.jpg',
                    'portfolio/guadalajara2011/guadalajara2011-4.jpg'
                ]
            },
            amgElectric: {
                title: "AMG Electric",
                desc: 'Maqueta de lanzamiento de Mercedes AMG Electric. Se realizó desde grabaciones del coche y se construyó el entorno digital desde ese punto.',
                video: 'https://www.youtube.com/embed/MP6_DW9HgAw',
                thumbnail: 'portfolio/amg/amg-1.jpg',
                gallery: [
                    'portfolio/amg/amg-1.jpg',
                    'portfolio/amg/amg-2.jpg',
                    'portfolio/amg/amg-3.jpg'
                ]
            }
        }
    ];

}


core.controller('MasterCtrl', ['$scope', '$sce', MasterCtrl]);

core.run(['$rootScope', '$window', '$location', function ($rootScope, $window, $location) {

    $rootScope.$on("$includeContentLoaded", function(event, templateName) {
        $('.modal img').on('click', function () { $('.modal').modal('hide') });
    });

    $rootScope.configureCarousel = function (interval) {

        if (typeof interval === 'undefined') {
            interval = 5000;
        }

        $('.carousel').carousel({
            interval: interval
        })
    }

    $rootScope.openLink = function (target) {

        $window.open(target, $location.absUrl());
    }

    // Added a -50 pixel elem position fix to accomodate navbar gap
    $rootScope.navigateTo = function (eID) {

        // $location.hash(eID)
        var navbarGap = 50;

        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }

        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

        var startY = currentYPosition();
        var stopY = elmYPosition(eID) - navbarGap;
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }

    }

}]);
