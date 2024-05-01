import './App.css';
import React, { useEffect, useState } from 'react';

function TESTJOIN() {
    const [insertResultMsg, setInsertResultMsg] = useState("");

    async function joinPokemonTable(event) {
        event.preventDefault();
        console.log("Form submitted!");

        const where = document.getElementById("whereclause").value;


        try {
            const response = await fetch('http://localhost:3001/join-pokemon-people', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    commonAttribute: where
                })
            })

            console.log("after fetch");

            const responseData = await response.json();

            const messageElement = document.getElementById("joinResultPokemonMsg");
            if (responseData.success) {
                const attribute = Object.keys(responseData.data[0]);
                const dataRows = responseData.data.map((entry, index) => (
                    <tr key={index}>
                        {attribute.map((key, idx) => (
                            <td key={idx}>{entry[key]}</td>
                        ))}
                    </tr>
                ));
                const table = (
                    <table>
                        <thead>
                        <tr>
                            {attribute.map((key, idx) => (
                                <th key={idx}>{key}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {dataRows}
                        </tbody>
                    </table>
                );
                setInsertResultMsg(table);
            } else {
                throw new Error(responseData.error);
            }
        } catch (err) {
            console.log("ERRORRRRRRRR");
            console.log(err);

            setInsertResultMsg(err.message);
        }
    }

    const clearPokemonList = () => {
        setInsertResultMsg("");
    };

    useEffect(() => {
        document.getElementById("joinPokemonTables").addEventListener("submit", joinPokemonTable);
        return () => {
            document.getElementById("joinPokemonTables").removeEventListener("submit", joinPokemonTable);
        };
    }, []);

    return (
        <div>
            <h4> JOIN POKEMON_CAUGHT and PEOPLE_HAS </h4>
            <form id="joinPokemonTables" style={{display: 'inline-block'}}>
                WHERE: <input type="text" id="whereclause" placeholder="Common Attribute" required/>
                <br/>
                <button type="submit"> Enter</button>
            </form>
            <div style={{display: 'inline-block', marginLeft: '-10rem'}}>
                <button onClick={clearPokemonList}> Clear Pokémon List</button>
            </div>
            <div id="joinResultPokemonMsg">{insertResultMsg}</div>

        </div>
    );
}

export default TESTJOIN;
