<template>
  <div class="popup">
    <div class="popup-inner">
      <button class="popup-close-button" @click="TogglePopup()">X</button>

        <div class="popup-inner-content">
          <h1 class="popup-title">Compartir lista</h1>

        <div class="selected-user">
          <div class="avatar-wrap">
            <img class="avatar" src="https://i.pravatar.cc/80?img=5" alt="user">
            <button class="chip-close" aria-label="remove">✕</button>
          </div>
        
          <div class="info">
            <div class="name">Sophia</div>
            <div class="handle">@sophia.richards</div>
          </div>
        </div>


        <input type="text" class="search-input" placeholder="Buscar usuarios" />

        <div class="suggested-div">
          <div class="section-title">Usuarios sugeridos</div>

          <ul class="suggested">
            <li class="suggested-item">
              <img class="avatar" src="https://i.pravatar.cc/80?img=12" alt="Henry Clark">
              <div class="text">
                <div class="name">Henry Clark</div>
                <div class="handle">@henry.clark</div>
              </div>
            </li>

            <li class="suggested-item">
              <img class="avatar" src="https://i.pravatar.cc/80?img=32" alt="Olivia Smith">
              <div class="text">
                <div class="name">Olivia Smith</div>
                <div class="handle">@olivia.smith</div>
              </div>
            </li>
          </ul>
        </div>
        <button class="primary-action">Compartir</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['TogglePopup']
}
</script>

<style>
.popup{
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;

  .popup-inner{
    position: relative;
    width: 420px;               /* ancho parecido a la captura */
    border: 1px solid rgba(0,0,0,0.4);
    border-radius: 14px;        /* esquinado consistente */
    background-color: #ece7df;
    padding: 16px 18px 18px;

    overflow: visible;

    .popup-close-button{
      overflow: visible;
      position: absolute;
      top: 14px;
      right: 14px;
      padding: 0;
      width: 24px;
      height: 24px;
      border: none;
      border-radius: 50%;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .popup-close-button:hover { opacity: 0.9; }

    .popup-inner-content{
      display: flex;
      flex-direction: column;
      gap: 12px;

      .popup-title{
        margin: 2px 0 8px 0;
        font-size: 1rem;
        font-weight: 600;
        text-align: center;
        color: #223030;
      }

      .selected-user{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
        padding: 0;
        width: max-content;

        .avatar-wrap{
          overflow: visible;
          position: relative;
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: rgba(0,0,0,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
        }
      
        .avatar{
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }
      
        .chip-close{
          position: absolute;
          top: -4px;
          right: -4px;
          border: none;
          background: #f7b7bd;
          color: #223030;
          border-radius: 9999px;
          width: 18px;
          height: 18px;
          font-size: 12px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(0,0,0,0.15);
        }
        .chip-close:hover{ opacity: 0.9; }
      
        .info{
          display: flex;
          flex-direction: column;
          text-align: left;
        
          .name{
            font-size: 0.9rem;
            font-weight: 600;
            color: #223030;
            line-height: 1.1;
          }
          .handle{
            font-size: 0.78rem;
            color: #6b6b6b;
          }
        }
      }


      .search-input{
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #d9d4cc;
        border-radius: 10px;
        background: #fff;
        padding: 12px 14px;
        font-size: 14px;
        color: #223030;
      }

      .section-title{
        margin-top: 6px;
        font-size: 0.9rem;
        font-weight: 600;
        color: #223030;
      }

      .suggested-div {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;

        .section-title {
          align-self: flex-start;
        }
      
        .suggested {
          width: 100%;
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        
          .suggested-item {
            display: flex;
            align-items: center;
            gap: 10px;
          
            .avatar {
              width: 36px;
              height: 36px;
              border-radius: 50%;
              object-fit: cover;
            }
          
            .text {
              display: flex;
              flex-direction: column;
            
              .name {
                font-size: 0.95rem;
                font-weight: 600;
                color: #223030;
                line-height: 1.1;
              }
            
              .handle {
                font-size: 0.8rem;
                color: #6b6b6b;
              }
            }
          
            .add-btn {
              margin-left: auto;
              width: 28px;
              height: 28px;
              border-radius: 9999px;
              border: none;
              background: #223030;
              color: #fff;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .add-btn:hover {
              opacity: 0.9;
            }
          }
        }
      }


      .primary-action{
        margin-top: 6px;
        width: 100%;
        border: none;
        border-radius: 14px;
        background: #223030;
        color: #fff;
        font-size: 1rem;
        font-weight: 600;
        padding: 12px 26px;
        cursor: pointer;
      }
      .primary-action:hover{ opacity: 0.9; }
    }
  }
}
</style>
