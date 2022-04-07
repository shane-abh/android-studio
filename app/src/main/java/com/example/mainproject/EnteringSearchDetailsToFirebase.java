package com.example.mainproject;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class EnteringSearchDetailsToFirebase extends AppCompatActivity {
    List<String> symbol;
    List<String> Name;
    public static List<String> displaySymbol;
    public static List<String> displayName;

    List<String> cpy;




    DatabaseReference databaseReferenceSymbol;
    DatabaseReference databaseReferenceName;
    DatabaseReference databaseReferenceSearch;

    TextView tx1 ,tx2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_entering_search_details_to_firebase);

        symbol = new ArrayList<>();
        Name = new ArrayList<>();
        displaySymbol = new ArrayList<>();
        displayName = new ArrayList<>();

        cpy = new ArrayList<>();



        databaseReferenceSymbol = FirebaseDatabase.getInstance().getReference().child("Search").child("Symbol");
        databaseReferenceName = FirebaseDatabase.getInstance().getReference().child("Search").child("Stock Name");
        databaseReferenceSearch = FirebaseDatabase.getInstance().getReference().child("Search");

        tx1 = findViewById(R.id.textView);
        tx2 = findViewById(R.id.textView2);


//        uploadSymbolList();
//        uploadNameList();
        getSymbolList();
        getNameList();





//        tx1.setText(displaySymbol.toString());
//        tx2.setText(displayName.toString());
    }

    public void uploadSymbolList(){
        InputStream inputStream1= getResources().openRawResource(R.raw.symbol);
        CSVFile csvFile1 = new CSVFile(inputStream1);
        List<List<String>> symbolf = csvFile1.read();




        for (int i = 0; i < symbolf.size(); i++) {
            for (int j = 0; j < 1; j++) {
                System.out.println(symbolf.get(i).get(j));
                symbol.add(symbolf.get(i).get(j));
                break;
            }
        }

        databaseReferenceSymbol.setValue(symbol).addOnCompleteListener(new OnCompleteListener<Void>() {
            @Override
            public void onComplete(@NonNull Task<Void> task) {
                if(task.isSuccessful()){
                    Toast.makeText(getApplicationContext(),"List Inserted",Toast.LENGTH_SHORT).show();
                }
            }
        });
    }



    public void uploadNameList(){
        InputStream inputStream1= getResources().openRawResource(R.raw.name);
        CSVFile csvFile1 = new CSVFile(inputStream1);
        List<List<String>> namef = csvFile1.read();




        for (int i = 0; i < namef.size(); i++) {
            for (int j = 0; j < 1; j++) {
                System.out.println(namef.get(i).get(j));
                Name.add(namef.get(i).get(j));
                break;
            }
        }

        databaseReferenceName.setValue(Name).addOnCompleteListener(new OnCompleteListener<Void>() {
            @Override
            public void onComplete(@NonNull Task<Void> task) {
                if(task.isSuccessful()){
                    Toast.makeText(getApplicationContext(),"Name List Inserted",Toast.LENGTH_SHORT).show();
                }
            }
        });
    }






    public void getSymbolList(){
        databaseReferenceSymbol.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if(snapshot.exists()){
                    for(DataSnapshot ds:snapshot.getChildren()){
                        String name = ds.getValue(String.class);
                        System.out.println(name);


                        displaySymbol.add(name);

                    }

                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });
    }


    public void getNameList(){
        databaseReferenceName.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if(snapshot.exists()){
                    for(DataSnapshot ds:snapshot.getChildren()){

                        String name = ds.getValue(String.class);

                        displayName.add(name);


                    }
//                    tx2.setText(displayName.toString());

                }

            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }

        });

    }



    public List<String> getName(){
        InputStream inputStream1= getResources().openRawResource(R.raw.name);
        CSVFile csvFile1 = new CSVFile(inputStream1);
        List<List<String>> namef = csvFile1.read();


        List<String> name = new ArrayList<>();

        for (int i = 0; i < namef.size(); i++) {
            for (int j = 0; j < 1; j++) {
//                System.out.println(namef.get(i).get(j));
                name.add(namef.get(i).get(j));
                break;
            }
        }
        return name;
    }

    public List<String> getSymbol(){
        InputStream inputStream1= getResources().openRawResource(R.raw.symbol);
        CSVFile csvFile1 = new CSVFile(inputStream1);
        List<List<String>> symbolf = csvFile1.read();

        List<String> symbol1 = new ArrayList<>();


        for (int i = 0; i < symbolf.size(); i++) {
            for (int j = 0; j < 1; j++) {
                symbol1.add(symbolf.get(i).get(j));
                break;
            }
        }
        return symbol1;
    }
}