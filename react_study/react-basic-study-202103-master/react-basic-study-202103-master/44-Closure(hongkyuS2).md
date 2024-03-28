참고 자료 : https://ko.javascript.info/closure

# 클로저란?

```javascript
const outter =() => {
    
    const maru = '마루';
    return () => {
        return maru;
    }
};
undefined
const a = outter();
a();
//"마루"
```

위와 같이 **내부함수는 외부함수의 지역변수에 접근** 할 수 있다.

그리고 **외부함수 렉시컬 환경은 해당 함수의 지역변수를 사용하는(렉시컬 환경을 참조하는) 내부함수(객체의 메서드 포함)가 사라질 때까지 사라지지 않는다**.

이와 같은 특성을 설명하는 개념이 클로저이다.









```javascript
function factory_movie(title){
    return {
        get_title : function (){
            return title;
        },
        set_title : function(_title){
            title = _title
        }
    }
}
ghost = factory_movie('Ghost in the shell');
matrix = factory_movie('Matrix');
 
alert(ghost.get_title()); //Ghost in the shell
alert(matrix.get_title()); // Matrix
 
ghost.set_title('공각기동대');
 
alert(ghost.get_title()); //공각기동대
alert(matrix.get_title()); //Matrix
```

1. 클로저는 객체의 메서드에서도 사용할 수 있다.
2. 동일한 외부함수 안에서 만들어진 내부함수나 메서드는 외부함수의 지역변수를 공유한다. ghost.set_title 메서드를 통해 (factory_movie의 지역변수인) title을 변경하고 ghost.get_title 메서드를 호출하니 title변수가 변경된 것을 확인할 수 있다.
3. 그런데 똑같은 외부함수 factory_movie를 공유하고 있는 ghost와 matrix의 get_title의 결과는 서로 각각 다르다. 그것은 **외부함수가 실행될 때마다 새로운 지역변수를 포함하는 클로저가 생성**되기 때문에 ghost와 matrix는 서로 완전히 독립된 객체가 된다.



# 렉시컬 환경

  자바스크립트에선 실행 중인 함수, 코드 블록, 스크립트 전체는 **렉시컬 환경**이라 불리는 **내부 숨김 연관 객체**를 갖는다.

*렉시컬환경은 가상의 객체이다.*



렉시컬 환경 객체는 두 부분으로 구성된다.

1. **환경레코드** - **모든 지역변수**를 프로퍼티로 저장하고 있는 객체이다. this 값과 같은 기타 정보도 여기에 저장된다.
2. **외부 렉시컬 환경에 대한 참조**



**'변수'**는 특수 내부 객체인 **환경 레코드의 프로퍼티**일 뿐이다.

변수를 가져오거나 변경하는 것은 환경 레코드의 프로퍼티를 가져오거나 변경함을 의미한다.

함수를 호출하면 함수에 대한 **렉시컬 환경이 자동으로 만들어 진다.** 해당 렉시컬 환경의 **환경 레코드**에는 함수의 **매개변수**와 **지역변수**가 저장된다.

그리고 **외부 렉시컬 환경에 대한 참조**를 통해 외부 렉시컬 환경에 접근할 수 있다. 즉 외부 지역변수에 접근할 수 있다.

# [[Environment]]

1. 모든 함수는 함수가 생성된 곳의 렉시컬 환경을 기억한다.

2. 함수는 **[[Environment]]**라 불리는 숨김 프로퍼티를 갖고

3. 여기에 **함수가 만들어진 곳의 렉시컬 환경**에 대한 참조가 저장되기 때문이다.

4. 그리고 [[Environment]]는 함수가 생성될 때 딱 한 번 그 값이 세팅되고 영원히 변하지 않는다.

5. 또한 렉시컬 환경 객체는 다른 객체와 마찬가지로 **도달할 수 없을 때 메모리에서 삭제된다.** 해당 렉시컬 환경 객체를 참조하는 중첩 함수가 하나라도 있으면 사라지지 않는다.



# 중첩함수 그리고 클로저

```javascript
const outter =() => {
    
    const maru = '마루';
    return () => {
        return maru;
    }
};
undefined
const a = outter();
a();
//"마루"
```

렉시컬 환경 객체는 다른 객체와 마찬가지로 도달할 수 없을 때 메모리에서 삭제된다.

해당 렉시컬 환경 객체를 참조하는 중첩 함수가 하나라도 있으면 사라지지 않는다.

위의 예제를 보면 outter의 호출이 끝나고, 리턴되는 중첩함수는 여전히 남아 있기 때문에,

outter의 렉시컬 환경 객체는 메모리에 남아있게 된다.



