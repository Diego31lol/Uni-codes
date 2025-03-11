#include <cstdlib>
#include <iostream>
#include <iomanip> // Para setw()
#include "colors.h"

using namespace std;

struct Nodo {
    int data;
    Nodo *next;
};

// Prototipos de funciones
void menu();
void insertarLista(Nodo *&, int);
void mostrarLista(Nodo *);
bool evitarDuplicados(Nodo *, int);
int calcularSuma(Nodo *);
double calcularPromedio(Nodo *);

Nodo *head = NULL;

int main() {
    cout << MAGENTA << BG_YELLOW; // Aplica colores al texto si "colors.h" es válido
    menu();
    return 0;
}

void menu() {
    int opcion, n;
    bool loop = true;

    do {
        cout << "\n====================================\n";
        cout << "  LISTA DINÁMICA SIMPLEMENTE ENLAZADA\n";
        cout << "====================================\n";
        cout << setw(5) << " " << "1. Insertar elemento en la lista\n";
        cout << setw(5) << " " << "2. Mostrar lista\n";
        cout << setw(5) << " " << "3. Buscar un elemento en la lista\n";
        cout << setw(5) << " " << "4. Mostrar suma y promedio de la lista\n";
        cout << setw(5) << " " << "5. Salir\n";
        cout << "====================================\n";
        cout << "Seleccione una opción: " << flush;
        cin >> opcion;
        cout << "\n";

        switch (opcion) {
            case 1:
                cout << "Ingrese un número entero: ";
                cin >> n;
                if (!evitarDuplicados(head, n)) {
                    insertarLista(head, n);
                    cout << "✅ Elemento " << n << " insertado correctamente.\n";
                } else {
                    cout << "❌ El elemento " << n << " ya está en la lista, no se puede duplicar.\n";
                }
                break;
            case 2:
                mostrarLista(head);
                break;
            case 3:
                cout << "Ingrese el número a buscar: ";
                cin >> n;
                if (evitarDuplicados(head, n)) {
                    cout << "✅ Elemento " << n << " encontrado en la lista.\n";
                } else {
                    cout << "❌ Elemento " << n << " no encontrado en la lista.\n";
                }
                break;
            case 4:
                cout << "\n📌 Suma de los elementos: " << calcularSuma(head) << "\n";
                cout << "📌 Promedio de los elementos: " << calcularPromedio(head) << "\n";
                break;
            case 5:
                cout << "👋 Saliendo del programa... ¡Hasta luego!\n";
                loop = false;
                break;
            default:
                cout << "⚠️ Opción no válida, intente de nuevo.\n";
        }
    } while (loop);
}

// Función para insertar un nodo en la lista en orden ascendente
void insertarLista(Nodo *&head, int n) {
    Nodo *new_nodo = new Nodo();
    new_nodo->data = n;
    new_nodo->next = NULL;
    Nodo *tail = head;
    Nodo *aux = NULL;

    while ((tail != NULL) && (tail->data < n)) {
        aux = tail;
        tail = tail->next;
    }

    if (aux == NULL) { // Insertar al inicio
        new_nodo->next = head;
        head = new_nodo;
    } else { // Insertar en medio o final
        aux->next = new_nodo;
        new_nodo->next = tail;
    }
}

// Función para mostrar los elementos de la lista
void mostrarLista(Nodo *head) {
    Nodo *actual = head;
    cout << "\n🔗 Elementos en la lista: ";
    while (actual != NULL) {
        cout << actual->data << " -> ";
        actual = actual->next;
    }
    cout << "NULL\n";
}

// Función para verificar si un elemento ya está en la lista
bool evitarDuplicados(Nodo *head, int n) {
    Nodo *actual = head;
    while (actual != NULL) {
        if (actual->data == n) {
            return true;
        }
        actual = actual->next;
    }
    return false;
}

// Función para calcular la suma de los elementos en la lista
int calcularSuma(Nodo *head) {
    int suma = 0;
    Nodo *actual = head;
    while (actual != NULL) {
        suma += actual->data;
        actual = actual->next;
    }
    return suma;
}

// Función para calcular el promedio de los elementos en la lista
double calcularPromedio(Nodo *head) {
    int suma = 0, contador = 0;
    Nodo *actual = head;
    while (actual != NULL) {
        suma += actual->data;
        contador++;
        actual = actual->next;
    }
    return (contador == 0) ? 0 : (double)suma / contador;
}
