import React from 'react';

function Fruit({ fruit }){
    return(
      <div>
        <b>{fruit.fruitName}</b> <span>({fruit.fruitColor})</span>
      </div>       
    );
}


function FruitList(){
    const fruits = [
        {
            id: 1,
            fruitName: '사과',
            fruitColor: '빨강'
        },
        {
            id: 2,
            fruitName: '바나나',
            fruitColor: '노랑'
        },
        {
            id: 3,
            fruitName: '포도',
            fruitColor: '보라빛깔'
        }

    ];

    return (
        <div>
            {fruits.map((fruit, index) => (
            	<Fruit fruit={fruit} key={index} />
            ))}
        </div>      
      );
}

export default FruitList;