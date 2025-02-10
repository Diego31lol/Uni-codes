#include <fstream> // librería para manejar la lectura y escritura de archivos
#include <iostream>

using namespace std;

int main() {
    system("cls");
    int outval = 19;
    string namefile, texto;

    cout << "Escribe un nombre para tu archivo: ";
    getline(cin, namefile);

    cout << "Escribe un texto para tu archivo: ";
    getline(cin, texto);

    // Crear y escribir en el archivo
    ofstream WriteFile(namefile); // Apertura del archivo en modo escritura
    if (WriteFile.fail()) {
        cout << "No se pudo crear el archivo." << endl;
        return 1;
    }

    WriteFile << texto << "\n"; // Escribir el texto ingresado por el usuario
    WriteFile << outval << "\n"; // Escribir el valor de outval en el archivo
    WriteFile.close(); // Cerrar el archivo

    // Leer el archivo
    int inval;
    ifstream ReadFile(namefile); // Apertura del archivo en modo lectura
    if (ReadFile.fail()) {
        cout << "No se encuentra el archivo." << endl;
    } else {
        ReadFile >> inval; // Leer el primer valor entero del archivo
         ReadFile >> texto; 
        ReadFile.close(); // Cerrar el archivo

        cout << "El valor escrito en el archivo es: " << inval << "\n";
        cout << "El valor escrito en el archivo es: " << texto <<"\n";
    }

    return 0;
}
