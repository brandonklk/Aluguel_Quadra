# make.sh nome_do_arquivo
# make.sh -h[help]

raiz=$(pwd)
if [ $# -eq 0 ]
then
    echo 'Passe o nome do arquivo';
    echo '  Exemplo: make.sh NomeDoArquivo';
    return 0;
fi

echo 'Make::'$1
cd frontend/src/pages
mkdir $1
cd $1

## Criando js
echo "import React, { Component, Fragment } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Loader from '../../component/Loader'
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
      let template = 'Teste'

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

# Criando Css
echo ".$1{}" >> $1.css


cd $raiz
# pwd
cd frontend/src

#Fazer o replace das novas rotas do front end
sed -i "s/RouterGeneric/<Route path=\"\/$1\" component={$1} \/>\\nRouterGeneric/gi" routes.js  
sed -i "s/\/\/ImportRouter/import $1 from '.\/pages\/$1\/$1'\\n\\/\\/ImportRouter/gi" routes.js  
