import React, {useState, useEffect, Fragment} from 'react'
import { Form } from 'react-bootstrap'

const makeArrayHours = (startTime, endTime) => {
    const array = []
    const lessThan10Am = (h) => h < 10 ? `0${h}:00` : `${h}:00`
    
    let h = (startTime.split(":")[0] * 1)
    for (h; (lessThan10Am(h)) <= endTime; h++) {
        let value = lessThan10Am(h)

        array.push({
            id: array.length + 1,
            value: value,
            disabled: false
        })
    }
    

    return array
}

export default function Checklist (props) {
    
    const horario_inicio = "07:00"
    const horario_fim = "22:00"

    let [list, setList] = useState([])
    let arr = makeArrayHours(horario_inicio, horario_fim)
    
    // const style = {
    //     badge: {
    //         'float': 'left',
    //         'padding': '.5em',
    //         'color': '#fafafa',
    //         'background': '#8BC34A',
    //         'border-radius': '12px',
    //         'box-shadow': '0px 0px 12px grey',
    //         'margin': '2px'
    //     }
    // }

    
    let arrTime = props.arrayScheduling.map((i)=> i.time)
    arr.forEach(element => {
        let isContido = arrTime.indexOf(element.value) >= 0
        if (isContido) {
            element.disabled = true
        }
    });

    const addOrRemover = (e) => {
        const {checked, value} = e.target

        if (checked) {
            setList([...list, value])
            props.FuncCallBack([...list, value])
            return
        }
        setList(list.filter((i) => i != value))
        props.FuncCallBack(list)
    }

    return (
        <Fragment>
         {arr.map((item, index) => (
            <div key={`${index}-${item}`} className="mb-3">
              <Form.Check 
                type='checkbox'
                id={`check-box-${index}`}
                label={item.value}
                value={item.value}
                onClick={addOrRemover}
                disabled={item.disabled}
              />
            </div>
          ))}

        {/* Agendamentos:
          <div>
            {
                list.map((item) => (<div style={style.badge}>{item}</div>))
            }
          </div> */}
        </Fragment>
    );
}