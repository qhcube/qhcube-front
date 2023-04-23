<template>
    <header>
        <div class="flex flex-nowrap max-w-fit align-items-center gap-6 py-4 px-4" style="margin: auto">
           <div>
               <img alt="ETSISI logo" src="/src/assets/etsisi-logo-100-sombra.png" style="width: calc(100%); opacity: 0.5"/>
           </div>
          <div class="two">
              <h1>Juego del Hipercubo Cuántico
                  <span>By Jesús García López de la Calle</span>
              </h1>
          </div>
       </div>
    </header>
</template>

<script>
export default {
    name: "MainTitle"
}
</script>

<style scoped>
h1 {
    position: relative;
    padding: 0;
    margin: 0;
    font-family: "Raleway", sans-serif;
    font-weight: 300;
    font-size: 40px;
    color: #080808;
    -webkit-transition: all 0.4s ease 0s;
    -o-transition: all 0.4s ease 0s;
    transition: all 0.4s ease 0s;
}

h1 span {
    display: block;
    font-size: 0.5em;
    line-height: 1.3;
}

h1 em {
    font-style: normal;
    font-weight: 600;
}

.two h1 {
    text-transform: capitalize;
}
.two h1:before {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 60px;
    height: 2px;
    content: "";
    background-color: #c50000;
}

.two h1 span {
    font-size: 13px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 4px;
    line-height: 3em;
    padding-left: 0.25em;
    color: rgba(0, 0, 0, 0.4);
    padding-bottom: 10px;
}

.alt-two h1 {
    text-align:center;
}

.alt-two h1:before {
    left:50%; margin-left:-30px;
}

</style>