import { html, css, LitElement } from 'lit-element';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-button/paper-button';

export class SearchComponent extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
      }
      paper-button.custom {
        background-color: #22223B !important;
        color: white !important;
        margin: 0 auto;
        display:inline-block;
      }

      paper-button.custom:hover {
        background-color: white;
        color: white;
      }

       paper-input.custom-input {
        --paper-input-container-focus-color: #22223B;
          margin: 10px 0px 10px 0px;
          padding: 0px 10px 14px 10px; 
          width:200px;
          display:inline-block;
      }
    `;
  }

  static get properties() {
    return {
      data: { type: Array },
    };
  }

  constructor() {
    super();
    this.data = [];
  }


  render() {
    return html`
      <paper-input class="custom-input" type="text" id="inputbusca"  placeholder="Busca tu cocktail preferido" label="Cocktail"></paper-input>
      <paper-button raised class="custom" @click=${this._busquedacocktail}>buscar</paper-button>
    `;
  }

  _busquedacocktail(e) {
    const input = this.shadowRoot.getElementById('inputbusca');
    const text = input.value;
    input.value = "";
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`)
      .then(response => {
        if (response.status !== 200) {
          alert(`Hubo un problema: ${response.status}`);
          return;
        }
        response.json().then(dataR => {
          if(dataR != null){
            this.data = dataR;
            this.dispatchEvent(new CustomEvent('info-loaded', { detail: this.data }));
            console.log(this.data);
          }else{
            alert("No hay resultados.");
          }
        });
      })
      .catch(err => {
        alert(`Error: ${err}`);
      });
  }

}
