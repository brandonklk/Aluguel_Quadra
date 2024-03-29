import React from 'react'
import { GrCloudUpload } from 'react-icons/gr'

let callbackSetBase64 = () => {}

const style = {
    root: {
        'marginTop': '1em',
    },
    input: {
        'display': 'none'
    },
    div:{
        'width': 'fit-content',
        'height': 'fit-content',
        'background': '#F0f0f5',
        'padding': '1em',
        'marginTop': '1em',
        'cursor': 'pointer'
    },
    image_teste: {
        'marginTop': '1em'
    }
    
}

const callback = (base64) => {
    callbackSetBase64(base64)
}

const handlerClick = () => {

    const elemtInputFile = document.getElementById('input-file');

    elemtInputFile.onchange = e => {
        if(!e.target.files.length) {
            document.getElementById("imgTest").innerHTML  = ''  
            callback(null)
            return
        }

        let file = e.target.files[0]
           
        const reader = new FileReader()
        reader.onload = (fileLoadedEvent) => {
            const base64 = fileLoadedEvent.target.result
            const image = new Image();
            
            let c = document.createElement('canvas');
            let ctx = c.getContext('2d');
            
            image.onload = () => {
                ctx.drawImage(image, 0, 0, 300, 150);
                callback(c.toDataURL())
            }
            
            image.src = base64
            image.width = 350
            document.getElementById("imgTest").innerHTML = image.outerHTML
        }
        
        reader.readAsDataURL(file)
        
    }
    elemtInputFile.click()
}

const Input = (props) => {
    callbackSetBase64 = props.callbackSetBase64

    return (
        <div style={style.root}>
            <input id="input-file" type="file" style={style.input}/>
            <div style={style.div} onClick={handlerClick}>
                <GrCloudUpload/> Escolha uma imagem
            </div>
            <div id="imgTest" style={style.image_teste}></div>
        </div>

        // <input type="file"/>
    )
}
export default Input