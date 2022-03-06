<template>
  <div>
    <nav>
      <div class="left">
        <button class="slbutton" @click="$router.push('/')">Quitter</button>
      </div>
      <div class="right">
        <button @click="$router.push('/account')">
          <i class="ri-account-circle-line ri-2x w"></i>
        </button>
        <button @click="$router.push('/lock')">
          <i class="ri-lock-2-line ri-2x w"></i>
        </button>
        <button @click="$router.push('/help')">
          <i class="ri-question-line ri-2x w"></i>
        </button>
      </div>
    </nav>
    <h1>Besoin d'aide ?</h1>
    <table>
      <tr>
        <td><b>Touche</b></td>
        <td><b>Description</b></td>
      </tr>
      <tr>
        <td>D</td>
        <td>Affiche une vue d'ensemble pour le jour en cours</td>
      </tr>
      <tr>
        <td>W</td>
        <td>Affiche une vue d'ensemble pour la semaine en cours</td>
      </tr>
      <tr>
        <td>M</td>
        <td>Affiche une vue d'ensemble pour le mois en cours</td>
      </tr>
      <tr>
        <td>Y</td>
        <td>
          Affiche une vue d'ensemble pour l'année en cours ({{
            new Date().getFullYear()
          }})
        </td>
      </tr>
    </table>
  </div>
</template>
<style>
table {
  width: 60%;
  margin: 2rem auto;
}
td:nth-child(n + 2) {
  text-align: justify;
}
tr {
  height: 42px;
}
td {
  border: solid 1px rgb(189, 189, 189);
  padding: 6px;
}
h4 {
  text-align: center;
}
</style>
