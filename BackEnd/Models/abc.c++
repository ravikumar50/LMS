#include <iostream>
#include <cmath>

using namespace std;

long long solve() {
    long long n;
    cin >> n;
    long long k = floor(log2(n + 1));
    if ((1LL << k) == (n + 1)) return k;
    else return k + 1;
}

int main() {
    int t;
    cin >> t;
    while (t--) {
        cout << solve() << endl;
    }
    return 0;
}   