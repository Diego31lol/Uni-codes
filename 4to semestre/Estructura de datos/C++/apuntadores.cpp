#include <iostream>

using namespace std;

// funcion para verificar si es numero primo
bool esPrimo(int* num) {
    if (*num < 2) return false;
    for (int i = 2; i * i <= *num; i++) {
        if (*num % i == 0) {
            return false;
        }
    }
    return true;
}

int main() {
    int num1, num2, num3; // Variables para los números
    int *ptr1 = &num1, *ptr2 = &num2, *ptr3 = &num3; // Apuntadores a las variables

    // Solicitar los números al usuario
    cout << "Ingrese el primer numero: ";
    cin >> *ptr1;
    cout << "Ingrese el segundo numero: ";
    cin >> *ptr2;
    cout << "Ingrese el tercer numero: ";
    cin >> *ptr3;

    // comparar mayor y menor con sus direcciones
    int* mayor = ptr1;
    int* menor = ptr1;

    if (*ptr2 > *mayor) mayor = ptr2;
    if (*ptr3 > *mayor) mayor = ptr3;

    if (*ptr2 < *menor) menor = ptr2;
    if (*ptr3 < *menor) menor = ptr3;

    // Imprimir el mayor y el menor 
    cout << "\nEl mayor es: " << *mayor << " en la direccion de memoria: " << mayor << endl;
    cout << "El menor es: " << *menor << " en la direccion de memoria: " << menor << endl;

    // Verificar si cada número es primo con las direcciones
    cout << "\nVerificando si los numeros son primos:\n";
    cout << "El numero en la direccion " << ptr1 << " (" << *ptr1 << ") " 
         << (esPrimo(ptr1) ? "es primo." : "NO es primo.") << endl;

    cout << "El numero en la direccion " << ptr2 << " (" << *ptr2 << ") " 
         << (esPrimo(ptr2) ? "es primo." : "NO es primo.") << endl;

    cout << "El numero en la direccion " << ptr3 << " (" << *ptr3 << ") " 
         << (esPrimo(ptr3) ? "es primo." : "NO es primo.") << endl;

    return 0;
}
