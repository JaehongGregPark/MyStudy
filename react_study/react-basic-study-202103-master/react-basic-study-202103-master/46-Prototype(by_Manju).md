# Prototype

<br>

## 🤔 Why we use `prototype`?

<br>

```jsx
function Animal(name, energy) {
  let animal = {};

  animal.name = name;
  animal.energy = energy;

  animal.eat = function (amount) {
    console.log(`${this.name} is eating`);
    this.energy += amount;
  };

  animal.sleep = function (length) {
    console.log(`${this.name} is sleeping`);
    this.energy += length;
  };

  animal.play = function (length) {
    console.log(`${this.name} is playing`);
    this.energy -= amount;
  };

  return animal;
}

const leo = Animal("Leo", 7);
const snoop = Animal("Snoop", 10);
```

위와 같이 animal 객체를 더 만들어 주고 싶을 때 우린 반복을 피하기 위해 함수를 만들 수 있습니다. 😮 하지만 다음과 같은 코드에 어떤 문제가 있을까요?

<br>

leo와 snoop이 각각 Animal이라는 함수의 결과값이 할당되는데 그 각각의 값안에 있는 eat, sleep, play가 정확히 일치합니다. 완전히 중복되고 있는거죠! 그리고 만약 저희가 100마리, 1000마리의 동물이 필요하다면??
똑같은 eat, sleep, play를 위해 너무 많은 memory를 할당하게 됩니다😂😂

<br>

```jsx
const animalMethod = {
    eat = function(amount) {
        console.log(`${this.name} is eating`)
        this.energy += amount
    },

    sleep = function(length) {
        console.log(`${this.name} is sleeping`)
        this.energy += length
    },

    play = function(length) {
        console.log(`${this.name} is playing`)
        this.energy -= amount
    }
}

function Animal(name, energy) {
    let animal = {}

    animal.name = name
    animal.energy = energy
    animal.eat = animalMethod.eat
    animal.sleep = animalMethod.sleep
    animal.play = animalMethod.play

    return animal
}

const leo = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)
```

animalMethod라는 객체를 따로 만들어주고 Animal function으로 만들어지는 animal의 eat, sleep, play는 모두 animalMethod의 method들을 참조하게 함으로써 메모리를 낭비하는 건 해결했어요! 😮 하지만 여기에도 문제점이 있네요!

<br>

만약 제가 animalMethod에 dance를 추가하면 어떻게 할까요? 그럼 Animal fuction에서도 `animal.dance = animalMethod.dance`를 해주어야 다른 animal을 생성해도 dance method를 사용할 수 있겠죠. 하지만 method를 추가할 때마다 이렇게 하는 건 너무 번거로워요😂😂

```jsx
const animalMethod = {
    eat = function(amount) {
        console.log(`${this.name} is eating`)
        this.energy += amount
    },

    sleep = function(length) {
        console.log(`${this.name} is sleeping`)
        this.energy += length
    },

    play = function(length) {
        console.log(`${this.name} is playing`)
        this.energy -= amount
    }
}

function Animal(name, energy) {
    let animal = Object.create(animalMethods)

    animal.name = name
    animal.energy = energy


    return animal
}

const leo = Animal('Leo', 7)
const snoop = Animal('Snoop', 10)
```

Animal function으로 만든 animal은 이제 animalMethod에 있는 어떤 method든 다 참조 할 수 있게되었어요! **`Object.create(animalMethod)`** 함으로써 **javascript는 animal object(여기서는 leo, snoop)에서 찾지 못하는 property나 method를 animalMethod object에서 해당 내용을 찾습니다.**

<br>

😮하지만 animalMethod를 저렇게 따로 만들어 놓지 않고 Javascript 자체적으로 이걸 가능하게 해주는 방법이 있죠!? 여기서 바로 **`Prototype`** 이 등장합니다!!

<br>

## 🤔 What is `Prototype`?

<br>

![image](https://user-images.githubusercontent.com/75834421/115960803-67a79480-a54e-11eb-8880-6ccdfb812072.png)

> Prototype is just a property that every function I create in Javascript has that points to an object

⭐ **Prototype은 Javascript에서 만든 모든 함수가 가지고 있는, 한 객체를 가리키는 property입니다** ⭐

<br>

그럼 위의 예제에서 언급한 animalMethod object(객체)에 있는 eat, sleep, play를 Animal function의 prototype에 넣으면 어떻게 될까요? (⭐잊지마세요!! prototype은 그냥 모든 함수가 가지고 있는 property이고 그 property가 객체일 뿐입니다!!)

```jsx
function Animal(name, energy) {
  let animal = Object.create(Animal.prototype);

  animal.name = name;
  animal.energy = energy;

  return animal;
}

Animal.prototype.eat = function (amount) {
  console.log(`${this.name} is eating`);
  this.energy += amount;
};

Animal.prototype.sleep = function (length) {
  console.log(`${this.name} is sleeping`);
  this.energy += length;
};

Animal.prototype.play = function (length) {
  console.log(`${this.name} is playing`);
  this.energy -= amount;
};

const leo = Animal("Leo", 7);
const snoop = Animal("Snoop", 10);
```

저희가 이렇게 한건 모두, Animal function의 instance(여기서는 animal)들이 methods(여기서는 eat, sleep, play)를 공유하길 원하기 때문입니다.

<br>

```jsx
function Animal(name, energy) {
  //let this = Object.create(Animal.prototype)

  this.name = name;
  this.energy = energy;

  //return this
}

Animal.prototype.eat = function (amount) {
  console.log(`${this.name} is eating`);
  this.energy += amount;
};

Animal.prototype.sleep = function (length) {
  console.log(`${this.name} is sleeping`);
  this.energy += length;
};

Animal.prototype.play = function (length) {
  console.log(`${this.name} is playing`);
  this.energy -= amount;
};

const leo = new Animal("Leo", 7);
const snoop = new Animal("Snoop", 10);
```

여기서 **`생성자 함수`** 와 그냥 함수의 차이를 알 수 있습니다. 함수 앞에 **`new`** 를 추가함으로서 Animal function의 형태를 this를 이용해 좀 더 깔끔하게 만들 수 있죠!

<br>

Javascript에도 ES6 부터 `Class`가 도입됩니다. 위와 같이 함수형으로 된 코트를 class 형태로 좀 더 깔끔하게 바꿀 수 있게 된거죠!!

```jsx
class Animal {
  constructor(name, energy) {
    this.name = name;
    this.energy = energy;
  }

  eat = function (amount) {
    console.log(`${this.name} is eating`);
    this.energy += amount;
  };

  sleep = function (length) {
    console.log(`${this.name} is sleeping`);
    this.energy += length;
  };

  play = function (length) {
    console.log(`${this.name} is playing`);
    this.energy -= amount;
  };
}

const leo = new Animal("Leo", 7);
const snoop = new Animal("Snoop", 10);
```

여기서 강조하고 싶은 건 `class` 라는 개념이 새로 태어난 것이 아니라 **함수를 기반으로 하고 있고 class 안의 method들은 모두 그 함수의 prototype이라는 사실이에요!**

<br>

그럼 다른 간단한 예로 한번 더 살펴볼까요!

```jsx
const friends = [];
const friendsWithoutSugar = new Array();
```

저희는 문법적 설탕(Sytactical sugar)덕분에 첫번째 코드 처럼 간단하게 Array를 생성 할 수 있죠! 그럼 여기서, 위와 같이 array instance(여기서 friends)를 만들 때마다, 어떻게 concat(), push(), slice() 같은 built-in 함수들을 쓸 수 있었을까요??

<br>

저흰 이제 명확하게 그 이유를 설명할 수 있어요!😁😁 저 모든 methods(concat(), push(), slice()...)들이 **`array의 prototype안에 있기 때문이죠!`**

![image](https://user-images.githubusercontent.com/75834421/115962772-d9d0a700-a557-11eb-883d-9b46d254a96a.png)

<br>

만약 어떠한 이유로 어떤 특정한 instance의 prototype에 어떤것들이 있는지 보고싶다면? **Object.getPrototypeOf( )** 를 사용하면 됩니다!

![image](https://user-images.githubusercontent.com/75834421/115963003-d8ec4500-a558-11eb-9898-07d2e2b3b9cf.png)

<br>

😮😮 여기서 주의할 점은 **`arrow function`은 생성자 함수가 될 수 없습니다!!** 즉, arrow function은 prototype property도 가질 필요가 없어지는거죠!

![image](https://user-images.githubusercontent.com/75834421/115963351-e2c27800-a559-11eb-84a8-23844e72a4b4.png)

<br>

<br>

## 🤔 Inheritance and Prototype Chain

<br>

그러면, Animal의 instance가 instance를 만들고 싶고 그 instance의 instance도 Animal에 정의되어 있는 property나 method를 사용하고 싶을 땐 어떻게 해야할까요?

```jsx
function Animal(name, energy) {
  this.name = name;
  this.energy = energy;
}

Animal.prototype.eat = function (amount) {
  console.log(`${this.name} is eating`);
  this.energy += amount;
};

Animal.prototype.sleep = function (length) {
  console.log(`${this.name} is sleeping`);
  this.energy += length;
};

Animal.prototype.play = function (length) {
  console.log(`${this.name} is playing`);
  this.energy -= amount;
};

function Dog(name, energy, breed) {
  Animal.call(this, name, energy);

  this.breed = breed;
}

const charlie = new Dog("Charlie", 10, "Goldendoodle");
```

위와 같이 정의 해주면 Animal의 property인 name과 energy도 쓰면서 breed라는 Dog만의 property도 추가해줬어요! 하지만 우리의 최종목표는 Animal의 property와 method모두 사용할 수 있는 겁니다!!

<br>

저희가 new 생성자 함수를 사용하기 전에 `어떤 객체에서 property나 method를 찾을 수 없을 때 이곳에서도 찾아봐` 라고 연결해준 함수가 뭐였을까요?
바로 **`Object.create(Animal.prototype)`** 입니다!!

```jsx
function Animal(name, energy) {
  this.name = name;
  this.energy = energy;
}

Animal.prototype.eat = function (amount) {
  console.log(`${this.name} is eating`);
  this.energy += amount;
};

Animal.prototype.sleep = function (length) {
  console.log(`${this.name} is sleeping`);
  this.energy += length;
};

Animal.prototype.play = function (length) {
  console.log(`${this.name} is playing`);
  this.energy -= amount;
};

function Dog(name, energy, breed) {
  //this = Object.create(Dog.prototype)
  Animal.call(this, name, energy);

  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);

Dog.prototype.bark = function () {
  console.log("Woof Woof");
  this.energy -= 0.1;
};

//Dog.prototype = Object.create(Animal.prototype) 때문에 charlie의 constructor가 Animal constructor를 가리키고 있음. charlie는 Dog의 instance이고 Dog constructor를 가리켜야 하므로 아래와 같은 코드 필요!!!
Dog.prototype.contructor = Dog;

const charlie = new Dog("Charlie", 10, "Goldendoodle");
```

이렇게 하면 Animal의 모든 property 와 method를 활용하면서 Dog의 instance인 charlie를 만들수 있습니다!! 이런식으로 **`Prototype Chain`** 이 형성됩니다!! 예를 들어 `charlie.eat()`을 실행시키면, javascript는 `Dog.prototype`을 먼저 찾아 보고, 없으면 연결되어 있는 `Animal.prototype`에서 `eat()`을 찾아서 실행시킵니다.

<br>

그런데.. Animal에는 Cat도 있고.. Zibra도 있고.. Penda도 있는데... 그 많은 동물들을 만들 때마다 이 긴 코드를 복사하긴 너무 힘들겠죠..?

<br>

그래서 ES6 이후 부터 등장한 class 를 사용하면

```jsx
class Animal {
  constructor(name, energy) {
    this.name = name;
    this.energy = energy;
  }

  eat = function (amount) {
    console.log(`${this.name} is eating`);
    this.energy += amount;
  };

  sleep = function (length) {
    console.log(`${this.name} is sleeping`);
    this.energy += length;
  };

  play = function (length) {
    console.log(`${this.name} is playing`);
    this.energy -= amount;
  };
}

class Dog extends Animal {
  constructor(name, energy, breed) {
    // super()는 extends하고 있는 class(여기선 Animal)의 constructor함수를 호출하고 있는 것과 같음
    // 함수형에서 Animal.call(this, name, energy)의 역할
    super(name, energy);
    this.breed = breed;
  }

  bark = function () {
    console.log("Woof Woof");
    this.energy -= 0.1;
  };
}
```

😉😉 이렇게 prototype이 무엇이고 instance와 inheritance개념에서는 좀 더 익숙한 class와 비교하면서 알아보았습니다!!

<br>

[참고]

- what is prototype : <https://www.youtube.com/watch?v=XskMWBXNbp0>
- Inheritance and Prototype chain : <https://www.youtube.com/watch?v=MiKdRJc4ooE>
