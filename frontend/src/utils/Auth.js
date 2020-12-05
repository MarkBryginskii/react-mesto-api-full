class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._endPoint = options.endPoint;
  }

  register(obj) {
    return this.fetch(this._baseUrl + this._endPoint.signup, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        "email": obj.email,
        "password": obj.password,
      })
    })
    .then((res) => { return res.json(); })
    .then((data) => { return data })
  }

  login(obj) {
    return this.fetch(this._baseUrl + this._endPoint.signin, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        "email": obj.email,
        "password": obj.password,
      })
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      localStorage.setItem('jwt', data.token);
      return data;
    })
  }

  userInfo(jwt) {
    return this.fetch(this._baseUrl + this._endPoint.user, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization : `Bearer ${jwt}`
      }
    })
    .then((res) => { return res.json(); })
    .then((data) => { return data })
  }
}

const appAuth = new Auth({
  baseUrl: "https://api.mestobruginskii.students.nomoredomains.rocks",
  endPoint: {
    default: '/',
    user: '/users/me',
    signup: '/signup',
    signin: '/signin',
  }
});

export default appAuth;
