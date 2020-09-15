import React, { Component } from 'react'

const  TableHead =  props => {
    const isDelete = (index) => {
        if (typeof props.FuncDelete === 'function') {
            props.head.push('Remover')
        }

        if (typeof props.FuncEdit === 'function') {
            props.head.push('Editar')
        }
    }
    isDelete()

    const rows = props.head.map((item, index) => {
        return (
            <th key={index.toString()}>
                {item}
            </th>
        );
    });

    return (
        <thead>
            <tr>
              {rows}
            </tr>
        </thead>
    );
}

const TableBody = props => {
    const isDelete = (index) => {
        let template = ''
        if (typeof props.FuncDelete === 'function') {
            template = <td><button onClick={() => props.FuncDelete(index)}>Remove</button></td> 
        }
        return template;
    }

    const isEdit = (index) => {
        let template = ''
        if (typeof props.FuncEdit === 'function') {
            template = <td><button onClick={() => props.FuncEdit(index)}>Editar</button></td> 
        }
        return template;
    }

    
    const rows = props.body.map((item, index) => {
        return (
            <tr key={index}>
                {
                    Object.values(item).map((p, i) => {
                        return (
                            <td key={index+i}>{p}</td>
                        );
                    })
                }
                {isDelete(index)}
                {isEdit(index)}
            </tr>
        );
    });

    return (
        <tbody>
            {rows}
        </tbody>
    );
}



class Table extends Component {

    render () {
        const { head, body, FuncDelete, FuncEdit } = this.props;

        return (
            <div>
                <table>
                   <TableHead head={ head } FuncDelete={FuncDelete} FuncEdit={FuncEdit}/>
                   <TableBody body={ body } FuncDelete={FuncDelete} FuncEdit={FuncEdit}/>
                </table>
            </div>
        );
    }
}

export default Table