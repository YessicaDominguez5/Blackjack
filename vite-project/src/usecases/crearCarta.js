
 //Mostrar la imagen
 export const crearCarta = (carta, imagenCarta) =>{


   
  
       imagenCarta.src = `/assets/cartas/${ carta }.png`; //Le indicamos la ruta de la imagen, y la carta a mostrar que cambia dependiendo que carta salga
  
       imagenCarta.classList.add("carta"); // Le agregamos la clase carta que creamos en css
  
       return imagenCarta;
  
  
  }