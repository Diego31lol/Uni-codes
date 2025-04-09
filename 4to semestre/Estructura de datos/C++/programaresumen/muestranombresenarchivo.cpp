#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    ofstream archivo("Nombres.txt");
    if (archivo.is_open()) {
        archivo << "Juan\nMaria\nLuis\nCarmen\n";
        archivo.close();
    }

    cout << "\033[1mLista de nombres:\033[0m\n";  // Negritas con ANSI escape
    ifstream lectura("Nombres.txt");
    string linea;
    while (getline(lectura, linea)) {
        cout << linea << endl;
    }

    return 0;
}

