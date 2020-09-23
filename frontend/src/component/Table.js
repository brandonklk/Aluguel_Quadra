import React, { Component } from 'react'
import { GrTrash, GrEdit } from 'react-icons/gr'

const iconsStyle = {
    'cursor': 'pointer'
}
const  TableHead =  props => {
    const isDelete = (index) => {
        if (typeof props.FuncDelete === 'function') {
            // props.head.push('Edit')
        }

        if (typeof props.FuncEdit === 'function') {
            // props.head.push('Editar')
        }
    }
    isDelete()
    const tHead = {
        padding:'1em'
    }
    
    const rows = props.head.map((item, index) => {
        return (
            <th style={tHead} key={index.toString()}>
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
    const tbody = {
        padding:'1em'
    }
    
    
    const isDelete = (index) => {
        let template = ''
        if (typeof props.FuncDelete === 'function') {
            template =  <td style={tbody}>
                            <GrTrash style={iconsStyle} onClick={()=>{props.FuncDelete(index)}}/>
                        </td> 
        }
        return template;
    }

    const isEdit = (index) => {
        let template = ''
        if (typeof props.FuncEdit === 'function') {
            template =  <td style={tbody}>
                            <GrEdit style={iconsStyle} onClick={()=>{props.FuncEdit(index)}}/>
                        </td> 
        }
        return template;
    }

    
    const rows = props.body.map((item, index) => {
        return (
            <tr key={index}>
                {
                    Object.values(item).map((p, i) => {
                        return (
                            <td  style={tbody} key={index+i}>{p}</td>
                        );
                    })
                }
                {isEdit(item.id)}
                {isDelete(item.id)}
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
        const styleTable = {
            width: '100%',
        }
        return (
            <table style={styleTable}>
                <TableHead head={ head } FuncDelete={FuncDelete} FuncEdit={FuncEdit}/>
                <TableBody body={ body } FuncDelete={FuncDelete} FuncEdit={FuncEdit}/>
            </table>
        );
    }
}

export default Table