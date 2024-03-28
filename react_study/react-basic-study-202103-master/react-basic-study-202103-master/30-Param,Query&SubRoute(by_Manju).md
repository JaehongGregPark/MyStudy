# How to use Params, Query and SubRoutes

## 🤔 Props in Route

- **Route**를 쓰면 기본적으로 받을 수 있는 **props**가 있습니다! 그리고 Route를 사용하지 않지만 Route를 쓰는 것 처럼 props정보를 받으려면 **withRouter**로 함수를 감싸주면 됩니다!

  ![image](https://user-images.githubusercontent.com/75834421/114296034-f266a900-9ae3-11eb-9a36-48d724af0373.png)

  ![image](https://user-images.githubusercontent.com/75834421/114296075-23df7480-9ae4-11eb-946d-adf868350d5a.png)

  ```jsx
  function Header({ location: { pathname } }) {
    return (
      <List>
        <Link to="/">
          <Item current={pathname === "/"}>Home</Item>
        </Link>
        <Link to="/photo">
          <Item current={pathname.includes("/photo")}>Gallery</Item>
        </Link>
      </List>
    );
  }

  export default withRouter(Header);
  ```

  <br>

- Using API with Router

  : 보통 우리가 data API를 많이 사용하는데 params와 query에 해당하는 부분은 다음과 같아요! (혹시 잘못 파악하고 있는 거라면 말씀해 주세요...!😂)

  ![image](https://user-images.githubusercontent.com/75834421/114300814-f4893180-9afc-11eb-9396-8abd54943d66.png)

  1.  axios를 이용해서 data API로 부터 우리가 원하는 정보를 fetching 하기 위한 instance를 따로 만들어 볼게요!

      ```jsx
      import axios from "axios";

      const api = axios.create({
        baseURL: "https://api.unsplash.com/",
        params: {
          client_id: "YOUR_ACCESS_KEY",
        },
      });

      export const photoApi = {
        getPhotos: () => api.get("photos"),
        search: (term) =>
          api.get("search/photos", {
            params: {
              query: term,
            },
          }),
      };
      ```

      <br>

  2.  **photoApi.getPhotos()** 를 이용해서 Gallery page를 꾸며볼게요!

      ```jsx
      export default function Photo({ location: { pathname } }) {
        const [photos, setPhotos] = useState([]);

        const getPhotos = async () => {
          try {
            const { data: photos } = await photoApi.getPhotos();
            setPhotos(photos);
          } catch (e) {
            console.log(e);
          }
        };

        useEffect(() => {
          getPhotos();
        }, []);

        return (
          <>
            <Container>
              <Title>What is your favorite?</Title>
              {photos.map((photo) => (
                <Image key={photo.id} src={photo.urls?.small} alt="photos" />
              ))}
            </Container>
      }
      ```

      => 실제 페이지에서 Inspect(검사) > Network창 확인하기

      <br>

## 🤔 SubRoute in Onepage

- Router를 이용하면 한페이지에 목록을 만들고, 그 목록에 또 다른 세부 목록을 만들고, 한페이지에 그 모든 걸 보여줄 수 있습니다! 예시로 Gallery page에 Search Route를 추가해 볼게요!

  1.  `Routes` file에서 페이지에 대한 router를 만들어 주고, `Header` file에서 Link를 설정해 줍니다. Home과 Gallery page!
      `(Link to: 이 목록을 눌렸을 때 어떤 주소로 이동할 거냐, Route: 이 주소로 가면 어떤 화면을 보여줄거냐)`

      ```jsx
      function Routes() {
        return (
          <>
            <Router>
              <Header />
              <Route path="/" exact component={Home} />
              <Route path="/photo" component={Photo} />
            </Router>
          </>
        );
      }

      export default Routes;
      ```

      ```jsx
      function Header({ location: { pathname } }) {
        return (
          <List>
            <Link to="/">
              <Item current={pathname === "/"}>Home</Item>
            </Link>
            <Link to="/photo">
              <Item current={pathname.includes("/photo")}>Gallery</Item>
            </Link>
          </List>
        );
      }

      export default withRouter(Header);
      ```

    <br>

  2.  그런 다음 Gallery page에 Search Route를 추가합니다. Gallery page의 세부 목록(서브라우트)로 search를 추가한다고 생각하면 됩니다!

      ```jsx
      export default function Photo({ location: { pathname } }) {
        const [photos, setPhotos] = useState([]);

        const getPhotos = async () => {
          try {
            const { data: photos } = await photoApi.getPhotos();
            setPhotos(photos);
          } catch (e) {
            console.log(e);
          }
        };

        useEffect(() => {
          getPhotos();
        }, []);
        return (
          <>
            <Container>
              <Title>What is your favorite?</Title>
              {photos.map((photo) => (
                <Image key={photo.id} src={photo.urls?.small} alt="photos" />
              ))}
            </Container>
            <SearchBtn>
              <SLink
                current={pathname === "/photo/search" ? 1 : 0}
                to="/photo/search"
              >
                Search
              </SLink>
            </SearchBtn>
            <Route path="/photo/search" component={Search} />
          </>
        );
      }
      ```

      <br>

  3.  `Search` component도 살펴 볼게요. **photoApi.search()** 사용한 것을 확인 할 수 있습니다.

      ```jsx
      export default function Search() {
        const [searchTerm, setSearchTerm] = useState("");
        const [results, setResults] = useState([]);

        const handleSubmit = (event) => {
          event.preventDefault();
          if (searchTerm !== "") {
            searchByTerm();
          }
        };

        const updateTerm = (event) => {
          const {
            target: { value },
          } = event;
          setSearchTerm(value);
        };

        const searchByTerm = async () => {
          try {
            const {
              data: { results },
            } = await photoApi.search(searchTerm);
            setResults(results);
          } catch (e) {
            console.log(e);
          }
        };

        return (
          <Container>
            <Form onSubmit={handleSubmit}>
              <Input
                placeholder="Search Photos..."
                value={searchTerm}
                onChange={updateTerm}
              />
            </Form>
            <PhotoContainer>
              {results &&
                results.map((result) => (
                  <Image
                    key={result.id}
                    src={result.urls?.small}
                    alt="searchphotos"
                  />
                ))}
            </PhotoContainer>
          </Container>
        );
      }
      ```

      => search 한 후 결과, 실제 페이지에서 Inspect(검사) > Network창 확인하기

    <br>

⭐ 이렇게 data API에서 params와 qeury가 어떤 부분이고, API Document를 활용해서 params와 query에 어떤 값을 넣어야 내가 원하는 정보를 가져올 수 있는지 알아 두면 좋을 것 같아요!

<br>

⭐ subroute는 한 페이지에서 모든 걸 볼 수 있는게 큰 특징입니다! 단, subroute 부분과 상위 route부분을 같이 보여주고 싶은 경우에는 상위 route의 path에 exact를 붙이면 안돼요!!

> (위의 예제에서는 search page를 Gallery page안에서 같이 보여준 것, 아래 예제는 아예 다른 page로 이동해버림)
>
> ```jsx
> function Routes() {
>   return (
>     <>
>       <Router>
>         <Header />
>         <Route path="/" exact component={Home} />
>         <Route path="/photo" exact component={Photo} />
>       </Router>
>     </>
>   );
> }
>
> export default Routes;
> ```
>
> Phote Route 부분에는 exact를 붙이면 "/photo/search" page로 따로 이동을 해버립니다!

<br>
