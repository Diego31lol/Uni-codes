#include <iostream>
#include <fstream>
#include <string>

using namespace std;

struct Data {
    string Nombre;
    int Edad;
};

void ingresarDatos() {
    ofstream archivo("datos.txt", ios::app); // Abrimos en modo append para no sobrescribir
    if (!archivo) {
        cerr << "Error al abrir el archivo para escribir." << endl;
        return;
    }

    Data temp;
    cout << "\nIngresa un nombre: ";
    cin >> temp.Nombre;
    cout << "Ingresa la edad: ";
    cin >> temp.Edad;
    
    archivo << temp.Nombre << " " << temp.Edad << endl;
    archivo.close();
    cout << "Datos guardados correctamente.\n";
}

void cargarDatos() {
    ifstream archivo("datos.txt");
    if (!archivo) {
        cerr << "No se pudo abrir el archivo para lectura." << endl;
        return;
    }
    
    cout << "\nDatos cargados desde el archivo:" << endl;
    Data temp;
    while (archivo >> temp.Nombre >> temp.Edad) {
        cout << "Nombre: " << temp.Nombre << ", Edad: " << temp.Edad << endl;
    }
    archivo.close();
}

int main() {
    cout << "PROGRAMA CON ESTRUCTURAS\n";
    
    cargarDatos(); // Cargar datos al iniciar
    
    char opcion;
    do {
        ingresarDatos();
        cout << "\nDeseas ingresar otro registro? (s/n): ";
        cin >> opcion;
    } while (opcion == 's' || opcion == 'S');
    
    cout << "\nDatos finales en el archivo:";
    cargarDatos();
    
    return 0;
}
