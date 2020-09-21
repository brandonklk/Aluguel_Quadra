# make.sh nome_do_arquivo
# make.sh -h[help]
raiz=$(pwd)
PATH_FRONTEND_SRC="$raiz/frontend/src"

createJsPage () {
    # Criando js

    echo "import React, { Component, Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Loader from '../../component/Loader'

import Actions from '../../actions/$1/$1'
import './$1.css'

class $1 extends Component {
    constructor (props) {
        super(props)
        this.state = this.getInitialize()
    }    

    getInitialize = () => {
        return {
            loading: false,  
            form: {
                name: '',
                password: '',
                email: '',
                fone: ''
            }
        }
    }

    clearState = () => {
        console.log('this.stateInitial',this.getInitialize())
        this.setState(this.getInitialize())
    }

    render () {
    let template = ''

        return (
            <Fragment>
                <Loader loading={this.state.loading}/>
                <Container className=\"$1\">
                <h1 className=\"title\">$1</h1>
                    <Row>
                        {template}
                    </Row>
                </Container>
            </Fragment>
        );
    }

}

export default $1" >> $1.js
}

createCssPage () {
    # Criando Css
    echo ".$1{}" >> $1.css
}

makePages ()
{
    pathPages='frontend/src/pages'
 
    cd $pathPages
    mkdir $1
    cd $1

    # echo "Make::Page in $(pwd)";
    createJsPage $1
    createCssPage $1
    echo "Make::$1.js";
    echo "Make::$1.css";
    
    cd $raiz
}


replaceOfRouter () {
    #Fazer o replace das novas rotas do front end
    cd frontend/src
    sed -i "s/RouterGeneric/\\t\\t\\t\\t<PrivateRouter path=\"\/$1\" component={$1} \/>\\n\\t\\t\\t\\tRouterGeneric/gi" routes.js  
    sed -i "s/\/\/ImportRouter/import $1 from '.\/pages\/$1\/$1'\\n\\/\\/ImportRouter/gi" routes.js  
    echo "New routes add";
}

createActions () {
    cd $raiz;
    cd "$PATH_FRONTEND_SRC/actions";
    mkdir $1;
    cd $1;
    echo "import Api from '../../services/api'
const Actions$1 = (router) => {
    
    function getAll () {
        return new Promise((resolve, reject) => {
            Api.get()
                .then(function(r){
                    resolve(r.data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }

    function getById (id) {
        return new Promise((resolve, reject) => {
            Api.get()
                .then(function(r){
                    resolve(r)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }

    function create (Object) {
        return new Promise((resolve, reject) => {
            Api.post()
                .then(function(r){
                    resolve(r)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }

    function edit () {

    }

    function remove () {

    }
    
    function returnThen (r) {
        console.log('r', r)
    }
    
    function returnCatch (reject, error) {
        reject(error)
    }

    return {getAll, getById, create, edit, remove}
}

export default Actions$1()">>"$1".js
echo "Make::Actions$1.js";
}

if [ $# -eq 0 ]
then
    echo 'Passe o nome do arquivo';
    echo '  Exemplo: make.sh NomeDoArquivo';
    return 0;
fi

echo 'Make::'$1
makePages $1
replaceOfRouter $1
createActions $1







