#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

template <typename Cont, typename Pred>
Cont filter(const Cont &container, Pred predicate) {
    Cont result;
    std::copy_if(container.begin(), container.end(),
      std::back_inserter(result), predicate);

    return result;
}

int main()
{
    auto func = [] () { cout << "Hello world\n"; };
    func(); // now call the function

    std::vector<int> myVec = {1,4,7,8,9,0};

    auto filteredVec = filter(myVec, [](int a) { return a > 5; });
    cout << filteredVec.size() << std::endl;
    cout << filteredVec[0]<< std::endl;
    cout << filteredVec[1]<< std::endl;
    cout << filteredVec[2]<< std::endl;

}
