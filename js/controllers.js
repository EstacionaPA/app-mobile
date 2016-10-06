angular.module('starter.controllers', [])

.controller('AppLogin', function($scope, $ionicModal, $timeout, $http) {

    $scope.loginData = {};
    $scope.loginData.user = '';
    $scope.loginData.pass = '';

    $scope.ActionCss = 'message-output neutral';
    $scope.validLogin = 'Verificando sessão... Aguarde por favor...';

    $scope.checkSession = function (type) {

        if(person.user == ''){
            $scope.ActionCss = 'message-output neutral';
            $scope.validLogin = 'Não há seções ativas. Faça o login!';
        }
        else{
            $http.post(con.url + '/request/login',
                       JSON.stringify(person),
                       config)
                        .success(function (data) {
                            if(data == 'm'){
                                document.location = '#/master/init';
                            }
                            else if(data == 'a'){
                                document.location = '#/admin/init';
                            }
                            else if(data == 'f'){
                                document.location = '#/func/init';
                            }
                            else if(data == 'c'){
                                document.location = '#/client/init';
                            }
                            else if(type == 'init' && data.accessLogin == '!login'){
                                
                            }
                        })

        }


            

    }
    $scope.doLogin = function() {
        $scope.validLogin = '';
        $scope.ActionCss = '';

       if(!$scope.loginData.user || !$scope.loginData.user) {
            $scope.ActionCss = 'message-output warning';
            $scope.validLogin = 'Preencha todos os campos!';
        }
        else
            $scope.doRequest()


    }
    $scope.doRequest = function () {

        $scope.validLogin = 'Verificando conexão com internet e fazendo requisição...'; 

        $http.post(con.url + '/login/valid', 
                   JSON.stringify($scope.loginData), 
                   config)

                    .success(function (data) {
                        if(data == 'done'){
                            $scope.ActionCss = 'message-output success';
                            $scope.validLogin = 'Logado com sucesso!';
                            person.user = $scope.loginData.user;
                            person.pass = $scope.loginData.pass;
                            $scope.checkSession();
                        }
                        else if(data == '!user!pass'){
                            $scope.ActionCss = 'message-output danger';
                            $scope.validLogin = 'Login e/ou senha inválidos!';
                        }
                        else if(data == 'inactive'){
                            $scope.ActionCss = 'message-output info';
                            $scope.validLogin = 'Seu usuário foi inativado!';
                        }
                        else if(data == 'nullFields') {
                            $scope.ActionCss = 'message-output warning';
                            $scope.validLogin = 'Preencha todos os campos!';
                        }

                    })
        .error(function () {
            $scope.ActionCss = 'message-output danger';
            $scope.validLogin = 'Houve algum erro na conexão, verifique sua internet e tente novamente!';
        });

    }

    //INICIO
    $scope.checkSession('init');

    
})

.controller('AppRegister', function($scope, $ionicModal, $timeout, $http) {

    
    $scope.actionFormSystem = '';
    $scope.actionFormPersonal = 'hidden';
    $scope.actionFormGeografic = 'hidden';
    $scope.registerData = {};
    
    $scope.registerData.user = '';
    $scope.registerData.pass = '';
    $scope.registerData.name = '';
    $scope.registerData.cpf = '';
    $scope.registerData.tel = '';
    $scope.registerData.cel = '';
    $scope.registerData.email = '';
    $scope.registerData.address = '';
    $scope.registerData.comp = 'N/A';
    $scope.registerData.block = '';
    $scope.registerData.number = '';
    $scope.registerData.cep = '';
    $scope.registerData.city = '';
    $scope.registerData.state = '';
    
    $scope.toFormPersonal = function () {
        $scope.actionFormSystem = 'hidden';
        $scope.actionFormPersonal = '';
    }
    
    $scope.backFormSystem = function () {
        $scope.actionFormPersonal = 'hidden';
        $scope.actionFormSystem = '';
    }
    
    $scope.toFormGeografic = function () {
        $scope.actionFormPersonal = 'hidden';
        $scope.actionFormGeografic = '';
    }
    
    $scope.backFormPersonal = function () {
        $scope.actionFormGeografic = 'hidden';
        $scope.actionFormPersonal = '';
    }
    
    $scope.register = function () {
        $scope.validRegister = '';
        //console.log(JSON.stringify($scope.registerData));
        
        $scope.validRegister = 'Verificando conexão com internet...'; 
        $scope.classBootStrap = 'message-output neutral';
        
        $http.post(con.url + '/register/client/added', JSON.stringify($scope.registerData), config)
        .success(function (data, status, headers, config) {
            if(data == 'success') {
                $scope.classBootStrap = 'message-output success';
                $scope.validRegister = 'Registrado com sucesso!';
                setTimeout(function() {
                    document.location = '#/app/login';
                }, 2000);
            }
            else if(data == 'nullFields') {
                $scope.classBootStrap = 'message-output warning';
                $scope.validRegister = 'Preencha todos os campos!';
            }
            else if(data == 'user') {
                $scope.classBootStrap = 'message-output danger';
                $scope.validRegister = 'Já existe uma pessoa registrada com esse usuário!';
            }
            else if(data == 'email') {
                $scope.classBootStrap = 'message-output danger';
                $scope.validRegister = 'Já existe uma pessoa registrada com esse email!';
            }
            else if(data == 'cpf') {
                $scope.classBootStrap = 'message-output danger';
                $scope.validRegister = 'Já existe uma pessoa registrada com esse CPF!';
            }
        })
        .error(function (data, status, header, config) {
            $scope.validRegister = 'Houve algum erro de registro, contacte o suporte!';
        });
    }
})

.controller('AppVacancy', function($scope, $ionicModal, $timeout, $http, $state) {
    
    
    
    var addPark = true;
    $scope.register = {};
    $scope.register.hora_reserva = '';
    $scope.register.hora_fim = '';
    $scope.register.data = '';
    
    $scope.consultar = function () {
        
        var data = '';
        parks = [];
        
        document.getElementById('Result').innerHTML = '';
        $scope.Feedback = '';
        $scope.ActionCssFeedback = '';
        
        if($scope.register.hora_reserva != '' && 
           $scope.register.hora_fim != '' &&
           $scope.register.data != ''){
                
                $scope.Feedback = 'Verificando conexão com internet...'; 
                $scope.ActionCssFeedback = 'message-output neutral';
            
                $http.post(con.url + '/vacancies/consult',
                           JSON.stringify($scope.register),
                           config)
                
                .success(function (data, status, header, config) {
                    
                    $scope.Feedback = 'Analizando...'; 
                    $scope.ActionCssFeedback = 'message-output neutral';
                    
                    if(data == 'empty'){
                        $scope.Feedback = 'Todos os estacionamentos disponíveis estão vazios. Registre uma vaga!';
                        $scope.ActionCssFeedback = 'message-output info';
                        return 0;
                    }else if(data == '!validDate'){
                        $scope.Feedback = 'A data é inválida!!';
                        $scope.ActionCssFeedback = 'message-output danger';
                        return 0;
                    }else if(data == '!validHour'){
                        $scope.Feedback = 'Houve um erro na seleção da Hora Inicial e/ou na Hora Final.';
                        $scope.ActionCssFeedback = 'message-output danger';
                        return 0;
                    }

                    for(var i = 0; i < data.length; i++){
                        addPark = true;
                        if(parks.length == 0){
                            $scope.addPark(data, i);
                            continue;
                        }
                        else{
                            for(var l = 0; l < parks.length; l++){
                                if(data[i].id_estac == parks[l].id ){
                                    parks[l].qtdRestVacancies = parks[l].qtdRestVacancies - 1;
                                    addPark = false;
                                    break;
                                }
                            }
                            if(addPark == true){
                                $scope.addPark(data, i);
                            }
                        }
                    }
                    
                    $scope.ListParks();
                    
                })
                .error(function (data, status, header, config) {
                    $scope.Feedback = 'Houve algum problema com a conexão com os servidores, verifique sua internet e tente novamente!';
                    $scope.ActionCssFeedback = 'message-output danger';
                })
        }else{
            
            $scope.Feedback = 'Preencha todos os campos!';
            $scope.ActionCssFeedback = 'message-output warning';
        }
        return false;
    }
    
    $scope.addPark = function (data, index) {
        parks.push({
                id: data[index].id_estac,
                nome: data[index].nome,
                qtdMaxVacancies: data[index].max_vagas,
                qtdRestVacancies: data[index].max_vagas - 1,
                addrees: '',
                num: '',
                city: '',
                state: ''
        })

    }
    
    $scope.ListParks = function () {
        
        var ul = document.createElement('ul');
        
        ul.className = 'list';
        
        $scope.Feedback = 'Atenção! Os estacionamentos aqui não listados são  os possuem todas as vagas disponíveis.';
        $scope.ActionCssFeedback = 'message-output warning';
        
        for(var i = 0; i < parks.length; i++){

            var a = null;
            a = document.createElement('a');
            a.className = 'item message-output info';
            a.id = parks[i].id;
            a.setAttribute('ng-click', '');
            a.innerHTML = parks[i].nome + 
                               '<br>' + //NOT FOUND ANOTHER BETTER SOLUTION
                               'Rua: ' +
                               '<br>' +  
                               'Tem ' + parks[i].qtdRestVacancies + ' vagas sobrando em um total de ' + parks[i].qtdMaxVacancies;
            ul.appendChild(a);
            document.getElementById('Result').appendChild(ul);
        }
    }

})

.controller('AppLoading', function($scope, DataVacancy, $http){

})

.controller('', function($scope) {
    var data = '';
    if(data == 'empty'){
        $scope.Feedback = 'Todos os estacionamentos disponíveis estão vazios. Registre uma vaga!';
        return 0;
    }else if(data == '!validHourConsult'){
        $scope.Feedback = 'A hora é inválida!';
        return 0;
    }else if(data == '!validHourEnd'){
        $scope.Feedback = 'O horario de fim escolhido está entre uma vaga já utilizada!';
        return 0;
    }else if(data == '!validHourInit'){
        $scope.Feedback = 'O horario do inicio da reserva está entre uma vaga já escolhida!';
        return 0;
    }else if(data == '!validHourInitBetween' || 
            data == '!validHourInitEnd'){
        $scope.Feedback = 'O horario escolhido está entre o horario de uma vaga já escolhido!';
        return 0;
    }else if(data == ''){
        $scope.Feedback = '';
        return 0;
    }else if(data == ''){
        $scope.Feedback = '';
        return 0;
}

})

.controller('AppParks', function($scope, $stateParams, $state, $http) {

    parks = [];
    $scope.Feedback = 'Verificando conexão com a internet...';
    $scope.FeedbackCss = 'message-output neutral';

    $http.post(con.url + '/getParks',
               config)
               .success(function(data, status, header, config){
                   $scope.FeedbackCss = 'hidden';
                   var ul = document.createElement('ul');
                   ul.className = 'list';
                   for(var i = 0; i<data.length; i++){
                      var a = document.createElement('a');
                      a.className = 'item message-output info' ;
                      a.innerHTML = 'Estacionamento: ' + data[i].estacionamento + 
                                    '<br>' +
                                    'Responsável: ' + data[i].responsavel + 
                                    '<br>' +  
                                    'Horario: ' + data[i].h_func_init + ' Até ' + data[i].h_func_fim;
                      ul.appendChild(a);
                      document.getElementById('ListParksOpen').appendChild(ul);
                     
                   }
                
               });

    $scope.addParks = function () {

    };

    $scope.listParks = function () {

    };

})

.controller('sair', function($scope, $ionicHistory, $state) {
    
    person.user = '';
    person.pass = '';
    $ionicHistory.clearHistory();
    $ionicHistory.clearCache();
    $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
    $state.go('app.init');

})

                            //-------------------//
                            //-------------------//                
                            //-------------------//
                            //-VARIÁVEIS-GLOBAIS-//
                            //-------------------//
                            //-------------------//
                            //-------------------//
var parks = [];

var parksOpen = [];

var person = {
    user: '',
    pass: ''
};

var con = {
    //url: 'http://estacionapa.com.br'
    url: 'http://192.168.0.103:80'
    //url: 'http://192.168.43.100:80'
    //url: 'http://192.168.40.180:80'
};

var config = {
    headers: {
              'Content-Type': 'application/json'
    },
    timeout: 5000
}
