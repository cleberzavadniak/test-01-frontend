import React from 'react';


class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parent: props.parent,
      username: '',
      password: '',
      session: props.session,
      status: '',
      success: null
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  onChangeUsername(event) {
    this.setState({
      username: event.target.value,
      status: ''
    });
  }

  onChangePassword(event) {
    this.setState({
      password: event.target.value,
      status: ''
    });
  }

  onSubmit(event) {
    event.preventDefault();

    var session = this.state['session'];
    var username = this.state['username'];
    var password = this.state['password'];

    var that = this;

    session.call('sign_up', [username, password]).then(function(response) {
      console.log(response);

      that.setState({
        confirmationToken: response.token,
        userId: response.id,
        status: "",
        success: true
      });
    }).catch(function(error) {
      console.log(error);
      if (error.args[0]) {
        that.setState({status: 'Error: ' + error.args[0]});
      }
      else {
        that.setState({status: 'Error: ' + error.error});
      }
    });
  }

  goBack(event) {
    event.preventDefault();
    this.state.parent.setState({signup: false});
  }

  render() {
    if (this.state.success) {
      return (
        <div>
          <h3>Nova conta criada com sucesso</h3>
          <p>
            Se essa aplicação fosse quente, você receberia
            um e-mail contendo um link mágico que serviria
            para confirmar sua conta.
          </p>
          <p>
            O token <strong>de confirmação</strong> seria o {this.state.confirmationToken}.
          </p>
          <p>
            Mas, por ora, basta você <a href='#' onClick={this.goBack}>clicar aqui</a> e
            experimentar logar-se usando as credenciais que acabou de criar.
          </p>
          <div className='status'>{this.state.status}</div>
        </div>
      )
    }

    return (
      <div>
        <h3>Criar nova conta</h3>
        <form onSubmit={this.onSubmit}>
          <p>
            <label>Usuário:</label>
            <input type='text' name='username' value={this.state.username} onChange={this.onChangeUsername} /><br/>
          </p>
          <p>
            <label>Senha:</label>
            <input type='password' name='password' value={this.state.password} onChange={this.onChangePassword} /><br/>
          </p>
          <p><input type='submit' name='submit' value='Criar' /></p>
        </form>
        <p><small><a href='#' onClick={this.goBack}>Voltar</a></small></p>
        <div className='status'>{this.state.status}</div>
      </div>
    );
  }
}

export default SignUpForm;
