import Header from './Header';

function Login() {
    return (
        <>
            <Header buttonValue="Регистрация" />
            <section className="login">
                <h2 className="login__title">Вход</h2>
                <form
                    method="post"
                    noValidate
                    className="login__form-container"
                >
                    <fieldset className="login__input-container">
                        <input
                            id="email"
                            type="email"
                            className="login__input"
                            autoComplete="off"
                            required
                            minLength="2"
                            maxLength="40"
                            name="email"
                            placeholder="Email"
                        />
                        <span id="error-name" className="login__error"></span>
                    </fieldset>
                    <fieldset className="login__input-container">
                        <input
                            id="password"
                            type="password"
                            className="login__input"
                            autoComplete="off"
                            required
                            minLength="2"
                            maxLength="200"
                            name="password"
                            placeholder="Пароль"
                        />
                        <span id="error-job" className="login__error"></span>
                    </fieldset>
                    <button className="login__button link" type="submit">
                        Войти
                    </button>
                </form>
            </section>
        </>
    );
}

export default Login;
