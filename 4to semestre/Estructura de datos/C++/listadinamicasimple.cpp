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
void eliminarElemento(Nodo *&, int);
void vaciarLista(Nodo *&);

Nodo *head = NULL;

int main() {
    cout << MAGENTA << BG_YELLOW;
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
        cout << setw(5) << " " << "5. Eliminar un elemento\n";
        cout << setw(5) << " " << "6. Vaciar la lista completa\n";
        cout << setw(5) << " " << "7. Salir\n";
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
                cout << "Ingrese el elemento a eliminar: ";
                cin >> n;
                eliminarElemento(head, n);
                break;
            case 6:
                vaciarLista(head);
                cout << "✅ La lista ha sido vaciada completamente.\n";
                break;
            case 7:
                cout << "👋 Saliendo del programa... ¡Hasta luego!\n";
                loop = false;
                break;
            default:
                cout << "⚠️ Opcion no valida, intente de nuevo.\n";
        }
    } while (loop);
}

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

    if (aux == NULL) {
        new_nodo->next = head;
        head = new_nodo;
    } else {
        aux->next = new_nodo;
        new_nodo->next = tail;
    }
}

void mostrarLista(Nodo *head) {
    Nodo *actual = head;
    cout << "\n📌 Estructura de la lista:\n";
    while (actual != NULL) {
        cout << "[" << actual->data << "|->";
        actual = actual->next;
    }
    cout << "NULL]" << endl;
}

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

int calcularSuma(Nodo *head) {
    int suma = 0;
    Nodo *actual = head;
    while (actual != NULL) {
        suma += actual->data;
        actual = actual->next;
    }
    return suma;
}

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

void eliminarElemento(Nodo *&head, int n) {
    if (head == NULL) {
        cout << "❌ La lista está vacía.\n";
        return;
    }

    Nodo *actual = head;
    Nodo *anterior = NULL;

    while (actual != NULL && actual->data != n) {
        anterior = actual;
        actual = actual->next;
    }

    if (actual == NULL) {
        cout << "❌ Elemento " << n << " no encontrado en la lista.\n";
        return;
    }

    if (anterior == NULL) {
        head = actual->next;
    } else {
        anterior->next = actual->next;
    }

    delete actual;
    cout << "✅ Elemento " << n << " eliminado correctamente.\n";
}

void vaciarLista(Nodo *&head) {
    Nodo *actual = head;
    while (actual != NULL) {
        Nodo *temp = actual;
        actual = actual->next;
        delete temp;
    }
    head = NULL;
}
