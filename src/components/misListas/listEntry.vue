<script setup>
import { ref } from 'vue';
import listSettingsPopup from '@/components/misListas/listSettingsPopup.vue';

const listSettingsPopupTrigger = ref(false)

function TogglePopup() {
  listSettingsPopupTrigger.value = !listSettingsPopupTrigger.value
}

</script>

<template>
    <div class="le-body">
        <!--todo: put image from db-->
        <img class="le-image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPYAAADNCAMAAAC8cX2UAAAAe1BMVEX///8AAADg4OC5ublycnLb29vDw8NlZWXGxsbv7+8VFRX39/fs7OxAQEDy8vL7+/vQ0NBSUlItLS1JSUmxsbEiIiJtbW0nJyc6OjqampobGxvV1dU/Pz8yMjJ8fHy4uLiLi4uioqKnp6dfX196enqSkpIODg6NjY1QUFDTY2dpAAAHWUlEQVR4nO2da1/COgzGGXcEBRERbwhe0O//CY+ecyTP2rRjsCV15P+S/tb1YU3TpunWahmGYRiGYRiGYRiGYRiGYRiGYRiGYRiGDP1NN8j7fVu7efUwuszibLVbWAfj5wLVWbbQbmMN3BeqznZX2o2snqdi2Vlfu5GVc3WA6gZad/8Q2c0z7s0hspvnw4rH8SzrajeyciYHqH6aareycsC0L3hWzRvPcqbdHnE00GV/c7NXfaPdFEFG9LA32m0RZEiymzcTCwOmPdFuiyDktVfaTRFkTA97rd0WQfrnadqfJLuZ/pmHvPaz7I0nbUVmOx2v/UJ/tzIdQdUDbbGEoNc+aIUvw6Wc6kOWulIIeu1hcWvEEDTtg4J3Qgia9qO2VuJWTvVhEWoZRCfk19pq97xIyk7HgYmutXFMe233PGZU/MYVP+yLB0wx1L5kins9miHKrrXRcW+Y8undvviaKR6T7HemGEbMe+7uMLQIr7VhR4KNW8ICiYnQX5FsbtsCnja7hQV9SdS0W6013Xk3Ysphzj72Swtkb+niGXdz2NcW3uJ6yeJNg7+FGXSubqOy4xcrrrVzxs3ZHzyQR7+0QHa8q7RaWfTqWrmge78xxdAbmEkzyF4yF8cHBkXTbrWW8LjjTWP23+KyYZzn/lHsSeIR8i3I7vnFPSrd+KVx2bDNw3ZimiLuTtNwBKAre/WLJxTrGvilcdlQ9Qdz5xHZF+f06wVaztonFTMTqfFd7NoCtz2LF9fMG92dW/ytqNgvjMve0qWcb9Tz2s7dudvDv+KPxnHZsM5hRg2oeaWQooGBJcZHwZTD/1NANmP55LZ3zEg9pYo18nFg740bWqI9NS6bCufMfXVNO2e9TNA2Ol+Jy47Wi/+nSs4ZbL5l/mokOl8ZzyOyYVnJuYivfelFFSpKg6EGf68VJu3+mjgqO+62wbZ0Uu1wNeK3D0YeX1lUdtxta5t2zrif/FKapvlxCJDtz7pfqdqhX62u1/7hHR63XxpbFE9jTzuei0NeWzJCjixA9nbYzzOkoWf30nehkfwmcmHW8S7sxOMyEuBqRAGtTPHpbXHbaoSbuIqgurc/V8uZfi1uXH0w0zshVDc+mdiGFJqyFQ+BaG586qk+5NhdXXCrFClmxc2rC0XT1sxYUj3fBamID/1Ojj6ElT46DjQ5XTmXwYz3yynq9Ol2d+wukRQgzUv0hQWkF1+hxZu7/Q0daOPdDrIBKpNwDBhqcFeJsfhKWDZEJr1JNywCNE07b9yf4TIvvhKWDZ3cC9nArJDZRpWEup0nAOIrXiwhLPsjIg0iyVVqOAIMNbjGTfEVL9BAst3QCyxvvCBD5H8UBkMN7tMhbQ/uZWHZcALfvQhMW/vwZjsLtwW2wN2Aclg2bWd6ewNg2mpr7f+ZgnG7Pe8z3Myg7FG4Ouz/1Yo4Agw1OEVbKnH3g6grO7Ij6QDRKLM0oM2dMHaoxM0xCcoGt+265oRMOx9qWASL3GQmku1sc0Xcdjpe+5srSFlyQrgwX3G3RIOyI+MBjZC3qhPy/4CwtuOeYbvKHZ6CsmH0d6cB4do0gGmVY9xTSkwNe2dHNsRrnMgouEp9045mNZAGt1vSm6/ysuHlUO7edlKmnc9q2OSLusEeG5INbtt1UtD9q5ZwFLDx6fRlfFdGviQkO7JqI6/NZajLgwco8g8V+qUzXyHZ+ay18BodvDabWi8OzEqcUEN4gz4kO+y2oSQF047lWIefUEg2RKAdt03jxEUCXvubKaYszYYAPKHBMAcN2HP8eQZJfIvcBf1Y/oMOMGBLkIZp50MNArDHRxQQzmpIw7RbGDQT4Etb7Z634sZWRyqmnQ811E4qpi1s3Am95k9wez8Vr/3DRC5Vizs0o8ZILFcrHdP+l0l/4W5iV0afjOiCO0fbVMiG0lhrywBrvKRMu2bg3AmTYd5YYDc5Ia9dO+FwapNpn6dpQ7AuMa9dK5AFdk5vewzn9zQZ2Clxc8CazJl6bTDtc5qQU1ouc7awsZzphLxz9qadTIQcGN2HP0h2CrTWTvHLCj3IWKqJjbZGHziaXBsJmnanuNUnk+CXFdbFrT6VFE17WdzsU9loa2QQeNopfllBwLa1JXLUP5Kn+fW6unc95d8Idxijj8EvS9q8mXcHRwAVPC9/fuimaNguM0og3h21anpcnViBBvnMpevyEf18BW9/Y0vAPdRd+oC5W0GqZp1j7I3pZe3SS3z6C4btv5Wk5DvEt14F3EvyUoP5qGi5vQzmm9pp5BTHGPmNLhcDazMVpJOLFoJ7S0Wpd11xFWi+duMwuC+tlEqqOrkCFbjv6pR6WNzT1j/TWQRnmhvRCnRgWl3K73JruT/guD+8Rpc8ksl8qqWmplaJ/+adku7Hd4EpHG4sxJ2mlf7Qi1tBirFDhnxc7bZ8nPfkCnRA8748ptEnV6BD7zc6Mj/SLB9/z2HMdd8iVJb2Yt1d38+OjxC0X9fd91MqMAzDMAzDMAzDMAzDMAzDMAzDMAzDMBrHP/SxZZgy06vyAAAAAElFTkSuQmCC">
        <div class="le-data">
            <h2>nombre</h2>
            <p>number of items</p>
        </div>
        <button class="le-button" @click="() => TogglePopup()">
          <!--todo: el area del hover esta raro-->
          <img class="le-settings-icon" src="https://www.svgrepo.com/show/345223/three-dots-vertical.svg">
        </button>
    </div>
    <listSettingsPopup v-if="listSettingsPopupTrigger" 
          :TogglePopup="() => TogglePopup()" />
</template>

<style scoped>
.le-body{
  width: auto;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 16px;

  .le-image{
    height: 60px;
    width: 60px;
    border-radius: 8px;
  }

  .le-button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;

    .le-settings-icon{
      height: 40px;
      width: 40px;
    }
  }

  .le-button:focus {
    outline: none;
  }

  .le-data{
    width: 90%;
    padding: 0 5% 0 2%;

    text-align: left;

    p{
    text-align: left;
    }
  }
}
</style>
