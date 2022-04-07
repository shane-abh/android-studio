package com.example.mainproject.ExpenseManager;

import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;

import java.util.HashMap;

public class FirebaseAdapter {
    private DatabaseReference databaseReference;

    public FirebaseAdapter(){
        FirebaseDatabase db = FirebaseDatabase.getInstance();
        FirebaseAuth auth = FirebaseAuth.getInstance();
        FirebaseUser user = auth.getCurrentUser();
        databaseReference = db.getReference().child("Users").child(user.getUid()).child(user.getDisplayName()).child("Expense Management");
    }


    public Task<Void> add(FinancialsClass u)
    {
        return databaseReference.push().setValue(u);
    }

    public Task<Void> update(String key, HashMap<String,Object> hashMap){

        return databaseReference.child(key).updateChildren(hashMap);
    }

    public Task<Void> remove(String key){
        return databaseReference.child(key).removeValue();
    }

    public Query get(String key){

        return databaseReference.orderByKey();
    }
}
