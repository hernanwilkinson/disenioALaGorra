#include <stdio.h>

int menorATres(int numero){
  return numero < 3;
}

int filtrar (int* aFiltrar, int size, int (*condicion)(int), int* resultado) {
  int cantidadFiltrada = 0;

  for(int i=0;i<size;i++)
    if(condicion(aFiltrar[i])) {
      resultado[cantidadFiltrada] = aFiltrar[i];
      cantidadFiltrada++;
    }

  return cantidadFiltrada;
}

int main() {

  int numeros[] = { 1, 2, 3, 4};
  int menoresA3[2];
  int cantidad = filtrar(numeros, 4, &menorATres, menoresA3);
  printf("%i\n",cantidad);
  printf("%i\n",menoresA3[0]);
  printf("%i\n",menoresA3[1]);
}
