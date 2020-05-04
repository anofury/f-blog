import { useState } from 'react'
import ArchiveTag from '../ArchiveTag/ArchiveTag'
import './ArchiveBlock.css'

export default function ArchiveBlock(props) {
    return (
        <div className='archive-block'>
            <p className='archive-title'>{props.title}</p>
            <div className='archive-group'>{
                Object.getOwnPropertyNames(props.data).length ?
                    Object.getOwnPropertyNames(props.data).map((item, idx) =>
                        <ArchiveTag title={item} article={props.data[item]} from={props.title} key={idx} />
                    )
                    : '暂无'
            }</div>
        </div>
    )
}