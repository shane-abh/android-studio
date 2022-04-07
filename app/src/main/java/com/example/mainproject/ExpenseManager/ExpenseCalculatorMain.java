package com.example.mainproject.ExpenseManager;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebView;
import android.widget.TextView;

import com.example.mainproject.R;
import com.github.mikephil.charting.charts.PieChart;
import com.github.mikephil.charting.data.PieData;
import com.github.mikephil.charting.data.PieDataSet;
import com.github.mikephil.charting.data.PieEntry;
import com.github.mikephil.charting.formatter.PercentFormatter;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class ExpenseCalculatorMain extends AppCompatActivity {

    PieChart pieChart;
//    TransactionAdapter adapter;
    ArrayList<FinancialsClass> transactionList;
    TextView details;

    double income,expense;

    FirebaseAdapter fb;
    String key = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_expense_calculator_main);

        details = findViewById(R.id.Details);
        details.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(),ExpenseDetails.class);
                startActivity(intent);
            }
        });

        pieChart = findViewById(R.id.pieChart_view);

        initPieChart();
        transactionList = new ArrayList<FinancialsClass>();

        fb = new FirebaseAdapter();

        loadfbData();


        WebView webView = findViewById(R.id.webview);
        webView.loadUrl("file:///android_asset/graph.html");

        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setAllowContentAccess(true);
        webView.getSettings().setAllowFileAccess(true);
        webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);

        webView.getSettings().setAppCacheEnabled(true);
        webView.getSettings().setDatabaseEnabled(true);


        webView.getSettings().setAllowFileAccessFromFileURLs(true);
        webView.getSettings().setAllowUniversalAccessFromFileURLs(true);
        webView.getSettings().setDomStorageEnabled(true);

    }

    private void initPieChart(){
        //using percentage as values instead of amount
        pieChart.setUsePercentValues(true);

        //remove the description label on the lower left corner, default true if not set
        pieChart.getDescription().setEnabled(true);
        pieChart.getLegend().setTextColor(Color.WHITE);

//        pieChart.spin( 500,0,-360f, Easing.EaseInOutQuad);
//        pieChart.setCenterText("");
//        pieChart.setCenterTextSize(18);
//        pieChart.setCenterTextColor(Color.WHITE);
        //enabling the user to rotate the chart, default true
        pieChart.setRotationEnabled(true);
        //adding friction when rotating the pie chart
        pieChart.setDragDecelerationFrictionCoef(0.9f);
        //setting the first entry start from right hand side, default starting from top
        pieChart.setRotationAngle(0);

        //highlight the entry when it is tapped, default true if not set
        pieChart.setHighlightPerTapEnabled(true);

        //setting the color of the hole in the middle, default white

        pieChart.setHoleColor(Color.parseColor("#000000"));
        pieChart.setHoleRadius(20);
        pieChart.setTransparentCircleRadius(55);
        pieChart.setBackgroundColor(Color.parseColor("#3C3F41"));


    }

    public void loadfbData(){
        fb.get(key).addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                transactionList.clear();
                ArrayList<PieEntry> pieEntries = new ArrayList<>();
                Map<String, Double> typeAmountMap = new HashMap<>();


                for(DataSnapshot dataSnapshot : snapshot.getChildren()){

                    FinancialsClass t = dataSnapshot.getValue(FinancialsClass.class);
                    key = dataSnapshot.getKey();
                    t.setKey(key);
                    transactionList.add(t);

                    typeAmountMap.put("Income", calculateIncome(transactionList));
                    typeAmountMap.put("Expense", calculateExpense(transactionList));
                    System.out.println(t.getCategory());


                }

                String label = "";
                //initializing colors for the entries
                ArrayList<Integer> colors = new ArrayList<>();
                colors.add(Color.parseColor("#304567"));
                colors.add(Color.parseColor("#309967"));
                colors.add(Color.parseColor("#476567"));
                colors.add(Color.parseColor("#890567"));
                colors.add(Color.parseColor("#a35567"));
                colors.add(Color.parseColor("#ff5f67"));
                colors.add(Color.parseColor("#3ca567"));

                for(String type: typeAmountMap.keySet()){
                    pieEntries.add(new PieEntry(typeAmountMap.get(type).floatValue(), type));
                }

                //collecting the entries with label name
                PieDataSet pieDataSet = new PieDataSet(pieEntries,label);
                //setting text size of the value
                pieDataSet.setValueTextSize(12f);
                //providing color list for coloring different entries
                pieDataSet.setColors(colors);
                //grouping the data set from entry to chart
                PieData pieData = new PieData(pieDataSet);
                //showing the value of the entries, default true if not set
                pieData.setDrawValues(true);
                pieData.setValueFormatter(new PercentFormatter());

                pieChart.setData(pieData);
                pieChart.invalidate();


            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });
    }



    public double calculateBalance(ArrayList<FinancialsClass> transactionList)
    {
        double bal = 0;
        for(FinancialsClass transaction : transactionList)
        {
            if(transaction.isPositive())
            {
                bal+=Double.parseDouble(transaction.getAmount());
            }
            else {
                bal-=Double.parseDouble(transaction.getAmount());
            }
        }
        return bal;
    }

    public double calculateIncome(ArrayList<FinancialsClass> transactionList)
    {

        income = 0;
        for(FinancialsClass transaction : transactionList)
        {
            if(transaction.isPositive())
            {

                income+= Double.parseDouble(transaction.getAmount());
            }

        }
        return income;
    }

    public  double calculateExpense(ArrayList<FinancialsClass> transactionList)
    {
        int bal = 0;
        expense = 0;
        for(FinancialsClass transaction : transactionList)
        {
            if(transaction.isPositive())
            {


            }
            else {

                expense+= Double.parseDouble(transaction.getAmount());
            }
        }
        return expense;
    }
}