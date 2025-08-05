# Spis treści
- [O projekcie](#o-projekcie)
- [Funkcjonalności](#funkcjonalności)
- [Uruchomienie](#uruchomienie)

## O projekcie
Library Loans to prosta, ale w pełni funkcjonalna aplikacja webowa, która umożliwia zarządzanie książkami, czytelnikami oraz wypożyczeniami. 
Backend aplikacji, napisany w języku C# z użyciem .NET i Entity Framework Core, odpowiada za logikę biznesową i interakcję z bazą danych. 
Frontend został napisany w React i TypeScript.

## Funkcjonalności
- Zarządzanie książkami
  - Wyświetlanie listy książek z informacją, czy i przez kogo jest aktualnie wypożyczona, z możliwością filtrowania po tytule
  - Dodawanie, edytowanie i usuwanie
  - Wyświetlanie dostępnych książek do wypożyczenia
- Zarządzanie czytelnikami
  - Wyświetlanie listy czytelników, z możliwością filtrowania po adresie Email
  - Dodawanie, edytowanie i usuwanie
  - Wyświetlanie aktualnych wypożyczeń czytelnika
- Zarządzanie wypożyczeniami
  - Wyświetlanie wszystkich wypożyczeń (aktywnych i historycznych), z możliwością filtorwania po tytule książki i adresie Email czytelnika
  - Wypożyczenie i zwrot książki

## Uruchomienie
Projekt uruchamiamy za pomocą dockera wpisując komendę
```sh
docker-compose up --build
```
Dostęp do aplikacji 
```sh
http://localhost:5137/
```
