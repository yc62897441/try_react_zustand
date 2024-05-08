// 套件
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// 靜態資源

// 自定義 components

// 自定義函數 or 參數

import { useCountStore, useNumberStore, useDataStore } from '../store' // zustand

function Button({ onClick, children }) {
    return <button onClick={onClick}>{children}</button>
}

function DeepChild() {
    const { count, count2, increase, increaseTwoCount, resetCount, increaseDouble } = useCountStore((state) => state)
    console.log('DeepChild render')

    return (
        <div>
            <h3>DeepChild</h3>
            <p>DeepChild Count:{count}</p>
            <p>DeepChild Count2:{count2}</p>
            <br />

            <Button onClick={() => increase(1)}>increase</Button>
            <Button onClick={() => increaseTwoCount(1)}>increaseTwoCount</Button>
            <Button onClick={() => increaseDouble()}>double</Button>
            <Button onClick={resetCount}>reset</Button>
        </div>
    )
}
const Child = function Child() {
    console.log('Child render')

    return (
        <div>
            <h2>Child</h2>
            <DeepChild />
        </div>
    )
}
function ParentOne() {
    const { count } = useCountStore((state) => state)
    console.log('ParentOne render')

    return (
        <div style={{ border: 'solid 1px black' }}>
            <h1>Here is Parent One (有 deep Child)</h1>
            <p>ParentOne Count:{count}</p>
            <br />

            <Child />
        </div>
    )
}

const Child2 = function Child2() {
    const { count } = useCountStore((state) => state)
    console.log('Child2 render')

    return (
        <div>
            <h2>Child2</h2>
            <p>這是 ParentOne 的 DeepChild 的 Count:{count}</p>
        </div>
    )
}
function ParentTwo() {
    console.log('ParentTwo render')
    const { number, increase, resetNumber } = useNumberStore((state) => state)

    return (
        <div style={{ border: 'solid 1px black' }}>
            <h1>Here is Parent Two</h1>
            <p>Number:{number}</p>
            <Button onClick={() => increase(1)}>increase</Button>
            <Button onClick={resetNumber}>reset</Button>
            <br />

            <Child2 />
        </div>
    )
}

function AsyncComponent() {
    const { data, status, getData } = useDataStore((state) => state)
    const [value, setValue] = useState('')

    function clickHandler() {
        if (value) getData(value) // getData 是 store 傳來的 function
    }

    return (
        <div>
            <h1>Fetch with zustand</h1>
            <input type="text" value={value} onChange={({ target }) => setValue(target.value)} />
            <button onClick={clickHandler}>Search</button>
            <br />

            {status === 'Idle' && <p>No Data.</p>}
            {status === 'Loading' && <p>Loading...</p>}
            {status === 'Success' && (
                <ul>
                    {data.map((item) => (
                        <li key={item.id}>
                            <h2>{item.full_name}</h2>
                            <p>
                                Repo Url:
                                <a href={item.html_url} target="_blank" rel="noreferrer noopener">
                                    {item.html_url}
                                </a>
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

function HomePage() {
    return (
        <main>
            <h1>HomePage</h1>
            <br />

            <ParentOne />
            <br />

            <ParentTwo />
            <br />

            <AsyncComponent />
        </main>
    )
}

export default HomePage
