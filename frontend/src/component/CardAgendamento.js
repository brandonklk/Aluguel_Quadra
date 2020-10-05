import React, { Fragment } from "react"
import {  Card  } from 'react-bootstrap'
import { GrTrash } from "react-icons/gr";
import { formatCurrency } from '../helper'

const RenderHorarios = (props) => {
    const {agendamento, removerScheduling} = props

    agendamento.horarios.forEach(h => {
        const horarioFim = ((h.time.split(':')[0]*1)+1)
        const horario_fim = horarioFim >= 10 ? `${horarioFim}:00` : `0${horarioFim}:00` 

        h.horario_inicio = h.time
        h.horario_fim = horario_fim
        h.value = formatCurrency(h.value)
    });
    
    return (
        <Fragment>
            <Card.Subtitle className="mb-2 text-muted">Horário{agendamento.horarios.length > 1 ? 's' :''}:</Card.Subtitle>
            {
                agendamento.horarios.map((h) => (
                    <Card.Subtitle key={h.id} className="mb-2 text-muted"> 
                        > {h.horario_inicio} às {h.horario_fim} - {h.name} - {h.value} 
                        <GrTrash className="button-delete" onClick={() =>{ removerScheduling(h) }}/>
                    </Card.Subtitle>
                ))
            }
        </Fragment>
    );
}

const CardAgendamento = (props) => {
    const { arr, onClick, removerScheduling } = props

    return (
        <Fragment>
            {
                arr.map((agendamento) => (
                    <Fragment key={agendamento.date}>
                        <Card body className="mt-2" onClick={onClick}>
                            <Card.Title>{agendamento.name}</Card.Title>
                            <RenderHorarios agendamento={agendamento} removerScheduling={removerScheduling} />
                            <hr/>
                            <Card.Subtitle className="mb-2 text-muted">Valor total: {agendamento.valor_total}</Card.Subtitle>
                        </Card>
                    </Fragment>
                ))
            }
        </Fragment>
    )
}

export default CardAgendamento