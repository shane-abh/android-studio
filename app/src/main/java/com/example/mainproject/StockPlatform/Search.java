package com.example.mainproject.StockPlatform;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.SearchView;
import android.widget.Toast;

import com.example.mainproject.R;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Search extends AppCompatActivity {

    DatabaseReference databaseReferenceSearch;
    ListView listView;

    List<String> symbol;
    List<String> name;

    HashMap<String,String> map;

    ArrayAdapter<String> adapter;
    ArrayList<String> mylist;

    SearchView searchView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search);

        databaseReferenceSearch = FirebaseDatabase.getInstance().getReference().child("Search");
        listView = findViewById(R.id.listView);
        listView.setClickable(true);

        symbol = new ArrayList<>();
        name = new ArrayList<>();

        map = new HashMap<>();

        searchView = findViewById(R.id.search);
        searchView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                searchView.setIconified(false);
            }
        });

        mylist = new ArrayList<>();
        adapter = new ArrayAdapter<String>(this,android.R.layout.simple_list_item_1,mylist);

        Search();

    }


    public void Search(){
        databaseReferenceSearch.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if(snapshot.exists()){
                    for(DataSnapshot ds:snapshot.child("Symbol").getChildren()){

//                        System.out.println(ds.getValue());
                        symbol.add(ds.getValue().toString());
                    }
                    for(DataSnapshot ds:snapshot.child("Stock Name").getChildren()){

//                        System.out.println(ds.getValue());
                        name.add(ds.getValue().toString());

                    }

                }

                for(int i=0;i<name.size();i++){
                    map.put(symbol.get(i),name.get(i));
                }

                mylist.addAll(map.values());

                listView.setAdapter(adapter);
                searchView.setQueryHint("Search");

                searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {

                    @Override
                    public boolean onQueryTextSubmit(String query)
                    {
                        // If the list contains the search query
                        // than filter the adapter
                        // using the filter method
                        // with the query as its argument
                        if (mylist.contains(query)) {
                            adapter.getFilter().filter(query);



                        }
                        else {
                            // Search query not found in List View
                            Toast
                                    .makeText(getApplicationContext(),"Not found",Toast.LENGTH_LONG)
                                    .show();
                        }
//                        listView.setVisibility(View.GONE);
                        return false;
                    }

                    // This method is overridden to filter
                    // the adapter according to a search query
                    // when the user is typing search
                    @Override
                    public boolean onQueryTextChange(String newText)
                    {
                        listView.setVisibility(View.VISIBLE);
                        adapter.getFilter().filter(newText);
                        Intent intent = new Intent(getApplicationContext(), StockPage.class);
                        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                            @Override
                            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                                Toast.makeText(getApplicationContext(),adapter.getItem(position),Toast.LENGTH_SHORT).show();
                                String key = "1";
                                for(Map.Entry<String, String> entry: map.entrySet()) {
                                    if(entry.getValue().contains(adapter.getItem(position))) {
                                        System.out.println("The key for value " + adapter.getItem(position) + " is " + entry.getKey());
                                        key = entry.getKey();
                                        break;
                                    }
                                }
                                intent.putExtra("message", key);
                                startActivity(intent);
                            }
                        });

                        return false;
                    }
                });

            }


            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }

        });


    }
}