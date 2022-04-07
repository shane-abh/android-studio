package com.example.mainproject.ExpenseManager;

import android.app.AlertDialog;
import android.app.DatePickerDialog;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import android.text.InputFilter;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.example.mainproject.R;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.ValueEventListener;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Locale;


public class AddExpenseFragment extends Fragment {


    public AddExpenseFragment() {
        // Required empty public constructor
    }

    Spinner spinner;
    String[] paths = {"Food", "Electronics", "Entertainment","Health","Bills","Savings","Shopping","Housing","Transportation",
            "Vehicle","Financial Expenses","Loan","Others"};

    Calendar myCalendar= Calendar.getInstance();
    EditText editText,amount,mess;
    Button btn;
    boolean positive = false;
    TextView tvSign,inc_exp;
    String key = null;
    ArrayList<FinancialsClass> transactionList;



    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_add_expense, container, false);

        spinner = view.findViewById(R.id.spinner);

        ArrayAdapter<String> adapter1 = new ArrayAdapter<String>(getContext(),
                android.R.layout.simple_spinner_item,paths);


        adapter1.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);

        spinner.setAdapter(adapter1);

        amount = view.findViewById(R.id.amount);
        amount.setFilters(new InputFilter[]{new DecimalDigitsInputFilter(5, 2)});
        mess = view.findViewById(R.id.message);
        editText = view.findViewById(R.id.Date);
        btn = view.findViewById(R.id.btn);
        tvSign = view.findViewById(R.id.tvSign);
        inc_exp = view.findViewById(R.id.inc_exp);

        transactionList = new ArrayList<>();






        DatePickerDialog.OnDateSetListener date =new DatePickerDialog.OnDateSetListener() {
            @Override
            public void onDateSet(DatePicker view, int year, int month, int day) {
                myCalendar.set(Calendar.YEAR, year);
                myCalendar.set(Calendar.MONTH,month);
                myCalendar.set(Calendar.DAY_OF_MONTH,day);
                updateLabel();
            }
        };
        editText.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new DatePickerDialog(getContext(),date,myCalendar.get(Calendar.YEAR),myCalendar.get(Calendar.MONTH),myCalendar.get(Calendar.DAY_OF_MONTH)).show();
            }
        });


        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                FirebaseAdapter fb = new FirebaseAdapter();
//                FinancialsClass a = new FinancialsClass();

//                a.setAmount(amount.getText().toString());
//                a.setCategory(spinner.getSelectedItem().toString());
//                a.setDate(editText.getText().toString());
//                a.setMessage(mess.getText().toString());
//                a.setPositive(positive);


                fb.get(key).addListenerForSingleValueEvent(new ValueEventListener() {
                    @Override
                    public void onDataChange(@NonNull DataSnapshot snapshot) {
                        transactionList.clear();
                        FinancialsClass a = new FinancialsClass();
                        for(DataSnapshot dataSnapshot : snapshot.getChildren()){
                            FinancialsClass t = dataSnapshot.getValue(FinancialsClass.class);
                            key = dataSnapshot.getKey();
                            t.setKey(key);
                            transactionList.add(t);
                        }
                        System.out.println(calculateBalance(transactionList));
                        double bal = calculateBalance(transactionList);
                        String income = calculateIncome(transactionList);
                        String expense = calculateExpense(transactionList);
                        if(!positive) {
                            if (Double.parseDouble(amount.getText().toString()) > bal) {
                                System.out.println("DONT ADD");
                                Toast.makeText(getContext(),"Insufficient balance",Toast.LENGTH_LONG).show();
                                new AlertDialog.Builder(getContext())
                                        .setTitle("Warning!")
                                        .setIcon(R.drawable.warning)
                                        .setPositiveButton("Ok", null)
                                        .setMessage( "Insufficient balance" )
                                        .show();

                            }else{
                                System.out.println("ADD");
                                a.setAmount(amount.getText().toString());
                                a.setCategory(spinner.getSelectedItem().toString());
                                a.setDate(editText.getText().toString());
                                a.setMessage(mess.getText().toString());
                                a.setPositive(positive);
                                a.setBalance(String.valueOf(bal));
                                a.setIncome(income);
                                a.setExpense(expense);
                                System.out.println("Added");
                                FirebaseAdapter fb2 = new FirebaseAdapter();
                                fb2.add(a).addOnCompleteListener(task -> {

                                    if (task.isSuccessful()) {
                                        Toast.makeText((getContext()), "Data inserted", Toast.LENGTH_SHORT).show();
                                    } else {
                                        Toast.makeText((getContext()), "Data not inserted", Toast.LENGTH_SHORT).show();
                                    }
                                });
                            }
                        }

                    }



                    @Override
                    public void onCancelled(@NonNull DatabaseError error) {

                    }
                });





            }
        });

        return view;
    }

    public double calculateBalance(ArrayList<FinancialsClass> transactionList) {
        double bal = 0;
        for (FinancialsClass transaction : transactionList) {
            if (transaction.isPositive()) {
                bal += Double.parseDouble(transaction.getAmount());
            } else {
                bal -= Double.parseDouble(transaction.getAmount());
            }
        }
        return bal;
    }

    public String calculateIncome(ArrayList<FinancialsClass> transactionList) {

        double income = 0;
        for (FinancialsClass transaction : transactionList) {
            if (transaction.isPositive()) {
                income += Double.parseDouble(transaction.getAmount());
            }

        }
        return String.valueOf(income);
    }

    public String calculateExpense(ArrayList<FinancialsClass> transactionList) {

        double expense = 0;
        for (FinancialsClass transaction : transactionList) {
            if (!transaction.isPositive()) {

                expense += Double.parseDouble(transaction.getAmount());
            }
        }
        return String.valueOf(expense);
    }




    private void updateLabel() {
        String myFormat = "MM/dd/yyyy";
        SimpleDateFormat dateFormat = new SimpleDateFormat(myFormat, Locale.ENGLISH);
        editText.setText(dateFormat.format(myCalendar.getTime()));
    }

}