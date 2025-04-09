#include <iostream>
#include <fstream>
using namespace std;

int main() {
    int numeros[] = {1, 2, 3, 4, 5};

    ofstream archivo_binario("Datos.bin", ios::binary);
    archivo_binario.write(reinterpret_cast<char*>(numeros), sizeof(numeros));
    archivo_binario.close();

    int leidos[5];
    ifstream lectura("Datos.bin", ios::binary);
    lectura.read(reinterpret_cast<char*>(leidos), sizeof(leidos));

    cout << "Numeros leidos del archivo binario:\n";
    for (int i = 0; i < 5; i++) {
        cout << leidos[i] << " ";
    }
    cout << endl;

    return 0;
}

