#include <fstream> // Librer´ıa para manejar la lectura y escritura de archivos
#include <iostream>
using namespace std;
int main() {
system("cls");
int num1, num2;
string namefile;
cout << "Escribe un nombre para tu archivo: ";
getline(cin, namefile);
cout << "Escribe el primer n´umero: ";
cin >> num1;
cout << "Escribe el segundo n´umero: ";
cin >> num2;
// Crear y escribir en el archivo
ofstream WriteFile(namefile); // Apertura del archivo en modo escritura
if (WriteFile.fail()) {
cout << "No se pudo crear el archivo." << endl;
return 1;
}
int suma = num1 + num2;
int resta = num1 - num2;
WriteFile << "La suma de " << num1 << " y " << num2 << " es: " << suma << "\n";
WriteFile << "La resta de " << num1 << " y " << num2 << " es: " << resta << "\n";
WriteFile.close(); // Cerrar el archivo
cout << "Los resultados se han escrito en el archivo " << namefile << "." << endl;
return 0;
}