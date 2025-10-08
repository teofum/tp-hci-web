<template>
  <div class="popup">
    <div class="popup-inner">
      <button class="popup-close-button" @click="TogglePopup()">X</button>
      <div class="popup-inner-content">
        <h1 class="agregar-lista-titulo">Agregar producto</h1>

        <div class="emoji-div">
          <div class="emoji-frame">
            <img src="https://th.bing.com/th/id/OIP.K3p3FqsRjBTPQmAEOQBJ4AHaH1?w=195&h=206&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3" class="emoji">
          </div>

          <div class="emoji-actions">
            <button class="agregar-foto-button">Agregar foto</button>
            <button class="elegir-emoji-button">Elegir Emoji</button>
          </div>
        </div>

        <input type="text" id="name" placeholder="Nombre" class="nombre-lista">

        <div class="section-detalles">Detalles</div>

        <input type="text" placeholder="Cantidad (unidades, kg, etc)" class="campo">
        <input type="text" placeholder="Precio" class="campo">
        <input type="text" placeholder="Categoría" class="campo">

        <button class="agregar-button">Agregar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  props: ['TogglePopup']
}
</script>

<style>
.popup{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  .popup-inner{
    position: relative;
    width: 340px; /* slightly wider to match screenshot */
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 12px; /* a bit rounder like the image */
    background-color: #ece7df;
    padding: 16px;
    
    .popup-close-button{
      padding: 0;
      position: absolute;
      top: 16px;
      right: 16px;
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      font-size: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
    }
    .popup-close-button:hover:hover {
      opacity: 0.9;
    }

    .agregar-lista-titulo{
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 16px 0;
      text-align: center;
      color: #223030;
    }

    .popup-inner-content{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .emoji-div{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        gap: 16px;
        align-items: center;
        padding: 12px 0 16px 0;

        .emoji-frame{
          width: 88px;
          height: 88px;
          border-radius: 16px;
          background: rgba(0,0,0,0.06); /* soft gray box like screenshot */
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .emoji{
          width: 70%;
          height: 70%;
          object-fit: contain;
        }
      
        .emoji-actions{
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .agregar-foto-button,
        .elegir-emoji-button{
          color: #FFFFFF;
          background-color: #223030;
          border-radius: 20px;
          border: none;
          height: fit-content;
          width: fit-content;
          padding: 10px 16px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: inset 0 0 0 1px rgba(0,0,0,0.08);
        }    
        .agregar-foto-button:hover,
        .elegir-emoji-button:hover {
          opacity: 0.9;
        }
      }

      .nombre-lista{
        border: 1px solid #d9d4cc; /* subtler border */
        border-radius: 10px;
        padding: 10px 12px;
        font-size: 14px;
        width: 100%;
        box-sizing: border-box;
        background-color: #fff;
        color: #223030;
        margin-bottom: 8px;
      }

      .section-detalles{
        width: 100%;
        font-size: 0.9rem;
        font-weight: 600;
        color: #223030;
        margin: 6px 0 6px 0;
      }

      .campo{
        border: 1px solid #d9d4cc;
        border-radius: 10px;
        padding: 10px 12px;
        font-size: 14px;
        width: 100%;
        box-sizing: border-box;
        background-color: #fff;
        color: #223030;
        margin: 6px 0;
      }

      .agregar-button{
        margin: 14px 0 4px 0;
        color: #FFFFFF;
        background-color: #223030;
        border-radius: 14px; /* more rounded like screenshot */
        border: none;
        height: fit-content;
        width: 100%;
        padding: 12px 26px ;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
      }
      .agregar-button:hover {
        opacity: 0.9;
      }
    }
  }
}
</style>
