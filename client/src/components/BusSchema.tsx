import React from 'react';
import {Stack} from "react-bootstrap";

const BusSchema = ({busyPlaces, setBusyPlaces, setChoosedPlaces}: {busyPlaces: number[], setBusyPlaces: Function, setChoosedPlaces: Function}) => {
    let resArr: number[] = []

    for(let i = 1; i <= 25; i++) {
        resArr.push(i)
    }

    const onClickHandler = (event: any) => {
        if(event.target.tagName === 'MAIN' && event.target.innerHTML.length <= 3) {
            event.target.style.background = 'red'
            const place = Number(event.target.innerHTML)

            if(busyPlaces.includes(place)) {
                return alert('Это место уже занято')
            }

            setBusyPlaces([...busyPlaces, Number(event.target.innerHTML)])
            setChoosedPlaces((prevState: number[]) => [...prevState, Number(event.target.innerHTML)])
        }
    }

    return (
        <Stack style={{position: 'relative', width: 210, marginRight: -20, marginTop: 10}} onClick={onClickHandler}>
            <div style={{width: 65, border: '1px solid black', position: 'absolute', textAlign: 'center'}}><b>Шофер</b></div>
            <div style={{width: 30, right: 45, border: '1px solid red', position: 'absolute', textAlign: 'center', cursor: 'pointer', zIndex: 99, borderRadius: '3px', background: `${busyPlaces.includes(26) ? 'red' : 'none'}`}}><main>26</main></div>
            <Stack direction={"horizontal"} gap={2} style={{flexWrap: 'wrap', marginTop: 50, zIndex: 99}} >
                {
                    resArr.map((item: number) => {
                        return <div key={item} style={{
                            width: 30,
                            background: `${busyPlaces.includes(item) ? 'red' : 'none'}`,
                            cursor: 'pointer',
                            border: '1px solid red',
                            textAlign: 'center',
                            borderRadius: '3px',
                            marginRight: `${(item === 2 || item === 20) ? '120px' : (item % 2 === 0 && item < 21) ? '30px' : '-4px'}`
                        }}><main>{item}</main></div>
                    })
                }
            </Stack>
            <div style={{width: 186, height: 300, border: '1px solid black', position: 'absolute', borderRadius: 10, left: -10, top: -10}}></div>
        </Stack>
    );
};

export default BusSchema;